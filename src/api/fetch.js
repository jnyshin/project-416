import { navigate } from "gatsby-link";
import client from "./client";

export const getUserData = (setter) => {
  client.get("/home").then((res) => {
    setter.setFolders(res.data.folders);
    setter.setBackground(res.data.backgroundImg.url);
    setter.setUnicorn(res.data.keepUnicorn);
    setter.setEmail(res.data.email);
    setter.setUsername(res.data.username);
    setter.setLocation(res.data.location);
    setter.setDisplayedBookmarks(res.data.folders[0].bookmarks);
    setter.setSelectedFolderId(res.data.folders[0]._id);
    if (res.data.todolists.length != 0) {
      res.data.todolists.forEach((tl) => {
        tl["toggle"] = true;
        tl["isUpdated"] = false;
        tl.todos.forEach((todo) => {
          todo["toggle"] = true;
          todo["isUpdated"] = false;
        });
      });
      setter.setTodolists(res.data.todolists);
    }
    res.data.notes.forEach((note) => (note["toggle"] = true));
    setter.setNotes(res.data.notes);

    setter.setLoading(false);
  });
};
