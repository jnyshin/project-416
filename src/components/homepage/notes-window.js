import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
} from "@material-ui/core";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { X } from "react-feather";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import styled from "styled-components";

const NotesWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const styles = {
    dialogPaper: {
      height: "800px",
    },
  };
  // const descriptionElementRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (open) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, [open]);
  // For the parent to access the child (Widget -> Window)

  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));
  return (
    <Dialog
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="notes-dialog"
      className="notes-window-size"
    >
      <DialogTitle id="notes-dialog">
        <h5 className="dialog-title">Notes Widget</h5>
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
        {/* <p> Notes window component</p> */}
        <Grid container lg={12} spacing={5}>
          <Grid item lg={3} container direction="column" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disableElevation
                justify-content="flex-start"
              >
                CSE416
              </Button>
              {/* <Typography variant="button" color="primary">
                CSE 416
              </Typography> */}
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <small> Homeplus grocery list</small>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <small> SBU Visit Document</small>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <Button
                justify-content="baseline"
                startIcon={<AddCircleOutlineRoundedIcon />}
              >
                Add a new note
              </Button>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item lg={9} sm container spacing={1}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <h5>
                  <b>CSE 416 Course</b>
                </h5>
                <Button>H1</Button>
                <Button>H2</Button>
                <Button>H3</Button>
                <Button>H4</Button>
                <Button>H5</Button>
                <Button>H6</Button>
                <Button>Blockquote</Button>
                <Button>UL</Button>
                <Button>OL</Button>
                <Button>Codeblock</Button>
                <Button>Italic</Button>
                <Button>Underline</Button>
                <Button color="primary">Bold</Button>
              </Grid>
              <Divider />
              <Grid item>
                <h6>
                  <b>Visit Details</b>
                </h6>{" "}
                <p>
                  Students must satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs
                  diufskje askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                  ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                  askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                  hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                  satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                  askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                  ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                  askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                  hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. ssidufsiduhf.
                  ssidufsiduhf.
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});
export default NotesWindow;
