import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import FormikEditTagFormWrapper from "../EditTagForm";


class FormDialog extends React.Component {
    constructor(props) {
        super(props);

        const {open} = props;

        this.state = {
            open: open,
        };
    }

    handleRequestClose = () => {
        this.setState({open: false});
    };

    render() {
        const {open} = this.state;
        const {children} = this.props;

        return (
            <div>
                <Dialog open={open} onClose={this.handleRequestClose}>
                    <DialogTitle>Edit Your Tag</DialogTitle>
                    <DialogContent>
                        {children}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


FormDialog.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
};

export default FormDialog;