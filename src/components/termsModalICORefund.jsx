import React, { Component } from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class TermsModalICORefund extends Component {

  render() {
    return (
      <Dialog open={this.props.isOpen} title="Disclaimer" onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">
          <Typography variant='h6' align='center'>
            CURV SALE REFUND TERMS & CONDITIONS
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='body1' align='justify'>
            By claiming and accepting this refund payment, you agree to the fullest extent permitted by applicable law, release Stichting CryptoCurve, a Dutch foundation (the "Company", "our", "we", or "us") and our respective past, present and future employees, officers, directors, contractors, consultants, advisors, equity holders, suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents, representatives, predecessors, successors and assigns (the “Company Parties”) from and against all claims, demands, actions, damages, losses, costs, and expenses (including attorneys’ fees) that arise from or relate to (i) your purchase or use of our tokens, (ii) your participation in our ICO, or (iii) or any other claim arising from your use of this platform or interactions with the Company through the date of this refund.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button style={{border: '1px solid #ccc'}} onClick={this.props.handleTermsAccepted} color="primary" autoFocus>
            Accept and Refund
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (TermsModalICORefund);
