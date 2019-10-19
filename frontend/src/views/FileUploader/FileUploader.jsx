import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
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
      selectedfile: null,
      upload_success: false,
      file_type_correct: true
    };
    // this.uploadFile=this.uploadFile(this);
  }

  onChangeHandler = (event) => {

    let extension =event.target.files[0].name.split('.')[1];
    if(extension==="csv"){
      this.setState({
        selectedfile: event.target.files[0],
        file_type_correct:true
      });
    }
    else{
      this.setState({
        selectedfile: null,
        file_type_correct:false,
        successMessage:`Incorrect file type. expected a .csv but got .${extension}, Please choose a csv file!`,
        errors:{message:`Incorrect file type. expected a .csv but got .${extension}`}
      });
    }
  }

  onClickHandler = () => {
    const { history } = this.props;
    let formData = new FormData();
    formData.append('file', this.state.selectedfile);
    
    axios.post(`http://${REACT_APP_SERVER_URL}/uploadcsv`, formData)
      .then(res => {
        console.log("The response is: ?>>>>>", res.data);
        if (res.data.message === "Succesfull") {
          this.setState({ upload_success: true,
            successMessage: "Succesfully Uploaded!"
           });
          // history.push('/admin/dashboard')
        }
      });
  }

  render() {

    const { classes } = this.props;
    const { errors } = this.state;

    let disabled = this.state.selectedfile ? false : true;
    console.log("Disabled is ",disabled);

    let snackbar = null;
    if (this.state.upload_success) {
      snackbar = <SnackbarContent
        message={
          this.state.successMessage
        }
        close
        color="success"
      />
    }
    if(!this.state.file_type_correct){
      snackbar = <SnackbarContent
        message={
          this.state.successMessage
        }
        color="danger"
      />
    }


    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Upload File</h4>
          <p className={classes.cardCategoryWhite}>
            Upload the recent leads list
                  </p>
        </CardHeader>
        <CardBody>
          {snackbar}
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
            <CustomInput
                    labelText="Choose File"
                    id="file"
                    errors={errors}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false,
                      type:'file',
                      onChange : this.onChangeHandler,
                      accept: '.csv'
                    }}
                  />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <Button onClick={this.onClickHandler} color="primary" disabled={disabled}>
            Upload
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