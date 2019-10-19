import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const { REACT_APP_SERVER_URL } = process.env;

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      subject: "",
      content:"",
      link:"",
      success: false
    };

    // this.uploadFile=this.uploadFile(this);
  }

  componentDidMount=()=>{
    axios.get(`http://${REACT_APP_SERVER_URL}/config/`)
    .then( res =>{
      console.log(res.data.mail_config[0]);
      let opts = res.data.mail_config[0];
      this.setState({
        subject:opts.subject,
        content:opts.mail_content,
        link:opts.link
      });
    });
  }

  onSubjectChangeHandler = (event) => {

    console.log(event.target.value)

    this.setState({
      subject: event.target.value
    })

  }

  onContentChangeHandler = (event) => {

    // console.log(event.target.files[0])

    this.setState({
      content: event.target.value
    })

  }

  onLinkChangeHandler = (event) => {

    // console.log(event.target.files[0])

    this.setState({
      link: event.target.value
    })

  }

  onClickHandler = () => {
    const { history } = this.props;
    
    let data ={
      subject:this.state.subject,
      mail_content:this.state.content,
      link:this.state.link
    }

    axios.post(`http://${REACT_APP_SERVER_URL}/config/insert`, data)
      .then(res => {
        console.log("The response is: ?>>>>>", res.data);
        if (res.data.message === "Succesfull") {
          this.setState({ success: true });
          history.push('/admin/dashboard')
        }
      });
  }

  render() {

    const { classes } = this.props;
    const { errors } = this.state;

    let disabled = true;

    if(this.state.subject && this.state.link && this.state.content){
      disabled = false;
    }

    console.log("Disabled is ",disabled);

    let snackbar = null;
    if (this.state.success) {
      snackbar = <SnackbarContent
        message={
          'Succesfully Uploaded!'
        }
        close
        color="success"
      />
    }


    return (
      <Card>


        <CardHeader color="primary">
          {snackbar}
          <h4 className={classes.cardTitleWhite}>Edit the mail content and configurations!</h4>
          <p className={classes.cardCategoryWhite}>
            Configure your email
                  </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
            <CustomInput
                    
                    labelText="Email Subject"
                    id="subject"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false,
                      onChange :this.onSubjectChangeHandler,
                      value:this.state.subject
                    }}
                  />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
            <CustomInput
                    labelText="Email content"
                    id="content"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false,
                      multiline:true,
                      onChange :this.onContentChangeHandler,
                      value:this.state.content
                    }}
                  />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
            <CustomInput
                    labelText="Link in the email"
                    id="time"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false,
                      onChange : this.onLinkChangeHandler,
                      value: this.state.link
                    }}
                  />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <Button onClick={this.onClickHandler} color="primary" disabled={disabled}>
            Submit
                  </Button>
        </CardFooter>
      </Card>


    )
  }

}

FileUploader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FileUploader);