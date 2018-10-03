import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {};

class CookiePolicy extends Component {

  render() {
    var paragraphStyle = {textAlign: 'justify', marginTop: '12px'}
 
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '50px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='left'>
          <Typography variant='display1' align='center'>
            CRYPTOCURVE COOKIE POLICY
          </Typography>
          <ol style={{paddingLeft: '0px'}}>
            <li>
              <p>
                <strong>Introduction</strong>
              </p>
              <p>
                Thank you for visiting CryptoCurve. Please read our Terms &amp; Conditions,
                Privacy Policy, and this Cookie Policy carefully, as you are agreeing to be
                bound by all three documents by using our Service.
              </p>
            </li>
            <li>
              <p>
                <strong>Definitions</strong>
              </p>
              <p>
                Throughout this policy, we may use certain words or phrases, and it is
                important that you understand the meaning of them. The following is a
                non-exhaustive list of definitions of words and phrases found in this
                document:
              </p>
              <ul style={{paddingLeft: '18px'}} type="disc">
                <li>
                  “CryptoCurve” refers to our company, known as “CryptoCurve Ltd.”; our
                  Site; our Service; or a combination of all or some of the preceding
                  definitions, depending on the context of the word;
                </li>
                <li>
                  “Service” refers to the services that we provide through our Site,
                  including sale of Simple Agreement for Future Tokens and any of our
                  CURV Tokens;
                </li>
                <li>
                  “Site” refers to our two websites, www.cryptocurve.io and
                  cryptocurve.network;
                </li>
                <li>
                  “User” refers to administrators, managers, employees, paid and unpaid
                  users of our Site and, without limiting the generality of the
                  foregoing, includes general visitors to our Site
                </li>
                <li>
                  “You” refers to you, the person (or entity) who is governed by this
                  Cookie Policy.
                </li>
              </ul>
            </li>
            <li>
              <p>
                <strong>Use of Cookies</strong>
              </p>
              <p>
                <strong><u></u></strong>
              </p>
              <p>
                Our Site does not use cookies. End of policy.
              </p>
            </li>
            <li>
              <p>
                <strong>Changes to this Cookie Policy</strong>
              </p>
              <p>
                We may revise this policy from time to time by posting a revised policy on
                our Website. We reserve the right to modify this policy at any time.
              </p>
              <p>
                Last Updates: June 26, 2018
              </p>
            </li>
          </ol>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(CookiePolicy);
