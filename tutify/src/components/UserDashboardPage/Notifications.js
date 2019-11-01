import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function Notifications() {

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Notifications
                    </Typography>
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Announcement title"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            Tutor Name
                                        </Typography>
                                        {" — Tutor announcement"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Announcement title"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            Tutor Name
                                        </Typography>
                                        {" — Tutor announcement"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Announcement Title"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            Tutor Name
                                        </Typography>
                                        {' — Tutor announcement'}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </React.Fragment>


    );
}
