import React from "react";
import { Grid } from "@material-ui/core";
import UnicornButton from "./unicorn-button";
import SettingsButton from "./settings-button";
import SearchBar from "./search-bar";

export default function NavigationBar() {
  return (
    <div className="navbar-wrapper">
      <Grid
        container
        spacing={1}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs>
          <UnicornButton className="button-unicorn" />
        </Grid>
        <Grid item xs={8}>
          <SearchBar />
        </Grid>
        <Grid item xs>
          <SettingsButton className="button-settings" />
        </Grid>
      </Grid>
    </div>
  );
}