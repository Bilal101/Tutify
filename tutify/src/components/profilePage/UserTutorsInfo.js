import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';
class UserTutorsInfo extends React.Component {
render() {
  const { classes } = this.props;
   
   return (
     <Card className={classes.card} >
         <CardContent>
       <Typography component="p" variant="h5" >
         <Box fontWeight="fontWeightBold">
           My Tutors
           </Box>
         </Typography>
         <Table size="medium">
       <TableBody>
       <TableCell>
             </TableCell>
             <TableCell>
             </TableCell> <TableCell>
             </TableCell> <TableCell>
             </TableCell> <TableCell>
             </TableCell>
           <TableRow>
             <TableCell padding="none" >
             <Avatar className={classes.avatar} style={{width: '15px' ,height:'15px'}}></Avatar>
             </TableCell>
             <TableCell style ={{fontSize: '12pt'}} >
             Mo Alawami
</TableCell> <TableCell>
             </TableCell><TableCell>
             </TableCell>
             <TableCell>
             <Fab
         variant="extended"
         aria-label="add"
         className={classes.margin} style={{ maxHeight: '25px', background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)'}}
       >
          <MessageIcon fontSize="small" style={{width: '15px' ,height:'15px'}}/>   &nbsp;
          Message
       </Fab>
             </TableCell>
           </TableRow>
       </TableBody>
     </Table>
</CardContent>
     </Card>
     );
 }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(UserTutorsInfo);