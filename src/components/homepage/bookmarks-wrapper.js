import { DialogActions, Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import Bookmark from "./bookmark";
import { FilePlus, Plus, X } from "react-feather";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import { Remove } from "@material-ui/icons";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { styled } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import nextId from "react-id-generator";
import produce from "immer";
import { UserContext } from "./context/UserContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const DialogActionButton = styled(DialogActions)({
  justifyContent: "left",
  marginLeft: "16px",
  marginBottom: "20px",
});

const useStyles = makeStyles({
  icon: {
    borderRadius: "50%",
    width: 20,
    height: 20,
    // boxShadow:
    //   "inset 0 0 0 2px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: (props) => props.backgroundColor,
  },
  checkedIcon: {
    backgroundColor: (props) => props.backgroundColor,
    boxShadow:
      "inset 0 0 0 2px rgba(51,51,51,1), inset 0 -1px 0 rgba(51,51,51,1)",
  },
});

function StyledRadio(props) {
  const classes = useStyles(props);
  if (props.className === "clear") {
    return (
      <Grid container justify="center" alignItems="center">
        <Radio
          className={classes.root}
          disableRipple
          checkedIcon={
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          }
          icon={<span className={classes.icon} />}
          {...props}
        ></Radio>
        <Remove className="remove-icon" />
      </Grid>
    );
  }
  return (
    <Radio
      className={classes.root}
      disableRipple
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const AddNewBookmarkButton = () => {
  const { selectedFolderId, folders, setFolders } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState(selectedFolderId);
  const [url, setURL] = useState("https://www.");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    //Since Select (material ui's component)'s default value is set to opened folder
    //When user click to open the addBookmark modal, this will select folder for user automatically.
    setFolder(selectedFolderId);
  };
  const handleClose = () => {
    setURL("https://www.");
    setTitle("");
    setColor("clear");
    setOpen(false);
  };
  const handleURLChange = (event) => {
    setURL(event.target.value);
    console.log(`URL is set to: ${event.target.value}`);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(`Title is set to: ${event.target.value}`);
  };
  const handleColorChange = (event) => {
    setColor(event.target.value);
    console.log(`Color is set to: ${event.target.value}`);
  };
  const handleChange = (event) => {
    setFolder(event.target.value);

    //selectedFolderId = event.target.value;
    console.log(`Folder is set to: ${event.target.value}`);
  };

  const handleSubmit = () => {
    const newBookMark = {
      title: title,
      url: url,
      thumbnail: "",
      color: color,
      id: nextId(),
    };
    console.log(
      `New bookmark will be created with url: ${url}, title: ${title}, color: ${color}, and folder: ${folder}`
    );
    console.log(newBookMark);
    console.log(selectedFolderId);
    console.log(folders);
    //this part is changed
    //Find folder's index based on folder's id
    const folderIndex = folders.findIndex((f) => f.id === folder);
    setFolders(
      produce(folders, (draft) => {
        draft[folderIndex].bookmarks.push(newBookMark);
      })
    );

    setURL("https://www.");
    setTitle("");
    //Default color is changed to clear.
    setColor("clear");
    setOpen(false);
  };
  return (
    <>
      <div className="bookmark-wrapper" onClick={() => handleClickOpen()}>
        <SvgIcon>
          <Plus color="white" strokeWidth={1} />
        </SvgIcon>
        <small>Add Bookmark</small>
      </div>

      {/* Add Bookmark dialog */}
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="new-bookmark-dialog"
      >
        <DialogTitle id="new-bookmark-dialog">
          <h5 className="dialog-title">Add a new bookmark</h5>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            className="button-dialog-close"
          >
            <SvgIcon>
              <X />
            </SvgIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              required
              id="new-bookmark-url"
              label="Website URL"
              fullWidth
              autoComplete="off"
              value={url}
              onChange={handleURLChange}
            />
            <TextField
              id="new-bookmark-title"
              label="Title"
              fullWidth
              autoComplete="off"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
            {/* TODO Visit link below for radio buttons  */}
            {/* https://material-ui.com/components/radio-buttons/ */}
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              className="grid-add-bookmark"
            >
              <large className="color-form-label">Color</large>
              <RadioGroup
                aria-label="color"
                //default value is changed to clear
                defaultValue="clear"
                name="radio-buttons-group"
                style={{ flexDirection: "row" }}
                onChange={handleColorChange}
              >
                <FormControlLabel
                  value="clear"
                  control={
                    <StyledRadio
                      //made className clear to have exception to add "remove" icon
                      className="clear"
                      backgroundColor="rgba(220, 220, 220, 0.5)"
                    />
                  }
                />
                <FormControlLabel
                  value="green"
                  control={<StyledRadio backgroundColor="#6FCF97" />}
                />
                <FormControlLabel
                  value="yellow"
                  control={<StyledRadio backgroundColor="#F2C94C" />}
                />
                <FormControlLabel
                  value="orange"
                  control={<StyledRadio backgroundColor="#F2994A" />}
                />
                <FormControlLabel
                  value="red"
                  control={<StyledRadio backgroundColor="#EB5757" />}
                />
                <FormControlLabel
                  value="blue"
                  control={<StyledRadio backgroundColor="#2F80ED" />}
                />
                <FormControlLabel
                  value="purple"
                  control={<StyledRadio backgroundColor="#BB6BD9" />}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} className="grid-add-bookmark">
              <FormControl variant="outlined" className="folder-form-control">
                <InputLabel id="folder-add-bookmark-label">Folder</InputLabel>
                <Select
                  labelId="folder-add-bookmark-label"
                  value={folder}
                  onChange={handleChange}
                  label="Folder"
                >
                  {folders.map((f) => (
                    //MenuItem value is changed from f.title => f.id;
                    //This will make handleChange's "event.target.value" to have folder's id, not title.
                    <MenuItem value={f.id}>{f.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </form>
        </DialogContent>
        <DialogActionButton>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            onClick={handleSubmit}
            className="button-100"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            onClick={handleClose}
            className="button-100"
          >
            Cancel
          </Button>
        </DialogActionButton>
      </Dialog>
    </>
  );
};

export default function BookmarksWrapper() {
  const {
    jiggle,
    displayedBookmarks,
    setFolders,
    folders,
    selectedFolderId,
  } = useContext(UserContext);
  // const [dragBookmarkIndex, setDragBookmarkIndex] = useState(-1);

  const onSortEnd = ({ oldIndex, newIndex }, e) => {
    const folderIndex = folders.findIndex(
      (folder) => folder.id === selectedFolderId
    );

    //If bookmark is moved to folder
    if (e.target.className === "folder-title") {
      //== because they can have different type
      if (e.target.id == selectedFolderId) {
        return;
      }
      const destinationFolderIndex = folders.findIndex(
        // == because they can have different type
        (f) => f.id == e.target.id
      );
      const movingBookmark = folders[folderIndex].bookmarks[oldIndex];

      //Delete bookmark
      setFolders(
        produce((draft) => {
          draft[folderIndex].bookmarks.splice(
            draft[folderIndex].bookmarks.findIndex(
              (bm) => bm.id === movingBookmark.id
            ),
            1
          );
        })
      );
      //Move bookmark
      setFolders(
        produce((draft) => {
          draft[destinationFolderIndex].bookmarks.push(movingBookmark);
        })
      );
    }
    //If rearranging bookmarks order
    else {
      const arr = arrayMove(displayedBookmarks, oldIndex, newIndex);

      setFolders(
        produce((draft) => {
          draft[folderIndex].bookmarks = arr;
        })
      );
    }
  };

  const SortableBookmark = SortableElement(({ value }) => (
    <Grid
      item
      xs={4}
      md={3}
      lg={2}
      zeroMinWidth
      className={jiggle ? "bookmarks-jiggle" : ""}
    >
      <Bookmark
        thumbnail={value.thumbnail}
        title={value.title}
        url={value.url}
        id={value.id}
      />
    </Grid>
  ));
  const SortableList = SortableContainer(({ items }) => {
    return (
      <>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          style={{ overflow: "auto" }}
        >
          {items.map((value, index) => (
            <SortableBookmark
              // key={`item-${value.id}`}
              index={index}
              value={value}
            />
          ))}

          <Grid item xs={4} md={3} lg={2} zeroMinWidth>
            <AddNewBookmarkButton></AddNewBookmarkButton>
          </Grid>
        </Grid>
      </>
    );
  });

  return (
    <>
      {jiggle ? (
        <>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {displayedBookmarks &&
              displayedBookmarks.map((bookmark) => (
                <Grid
                  item
                  xs={4}
                  md={3}
                  lg={2}
                  zeroMinWidth
                  className={jiggle ? "bookmarks-jiggle" : ""}
                >
                  <Bookmark
                    thumbnail={bookmark.thumbnail}
                    title={bookmark.title}
                    url={bookmark.url}
                    id={bookmark.id}
                  />
                </Grid>
              ))}
            <Grid item xs={4} md={3} lg={2} zeroMinWidth>
              <AddNewBookmarkButton></AddNewBookmarkButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <SortableList
          items={displayedBookmarks}
          onSortEnd={onSortEnd}
          axis="xy"
          distance={5}
        />
      )}
    </>
  );
}
