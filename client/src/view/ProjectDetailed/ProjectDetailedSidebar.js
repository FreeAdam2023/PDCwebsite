import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";

/**
 * @author @binjiasata
 * @description Project detail sidebar, show the principal of this project.
 *
 */

const ProjectDetailedSidebar = ({ project }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        Organizer
      </Segment>
      <Segment attached>
        <Item.Group divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right">
              Host
            </Label>
            </Item>
            {project.user && project.user.map((user) =>
            <Item>
            <Item.Image size="tiny" rounded src={user.picture}/>
            <Item.Content verticalAlign="middle">
            <Item.Header as="h3">{user.name}</Item.Header>
            <Item.Meta>{user.email}</Item.Meta>
            </Item.Content>
            </Item>
            )} 
        </Item.Group>
      </Segment>
    </Fragment>
  );
};

export default ProjectDetailedSidebar;
