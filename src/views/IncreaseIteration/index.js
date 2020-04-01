import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { useForm } from 'react-hook-form';
import { Page } from '../../components';
import Header from '../../components/Header/Header';
import useRouter from '../../utils/useRouter';
import useWeb3Connect from '../../utils/useWeb3Connect';
import LoadingWeb3 from '../../components/LoadingWeb3/LoadingWeb3';
import { useRedirectHomeIfNoEthAccount } from '../../utils/useCommonUtils';
const BN = require('bn.js');

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '75%',
      minWidth: 180,
    },
    width: '100%',
    padding: theme.spacing(3),
  },
  decriptionBlurb: { margin: '16px 0' },
  textField: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
  fieldGroup: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      marginTop: theme.spacing(1),
    },
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  wrapper: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(2),
  },
  hiddenImage: {
    display: 'none',
  },
  image: {
    display: 'block',
  },
  statusMsg: {
    marginLeft: 16,
  },
  button: {
    width: 190,
  },
}));

const Deposit = () => {
  const classes = useStyles();
  const web3Connect = useWeb3Connect();

  useRedirectHomeIfNoEthAccount();

  return (
    <Page className={classes.root} title="dao.care | Deposit">
      {web3Connect.loadingWeb3 ? (
        <>
          <LoadingWeb3 />
        </>
      ) : (
        <>
          <Header />
          <Typography variant="body1" className={classes.decriptionBlurb}>
            This is an admin function to increase the iteration.
          </Typography>
          <div
            className={classes.divContainer}
            style={{
              marginTop: 24,
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            <Button
              // variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<UpdateIcon />}
              onClick={web3Connect.contracts.dao.methods.distributeFunds}
            >
              Increment Iteration
            </Button>
          </div>
        </>
      )}
    </Page>
  );
};

Deposit.propTypes = {
  className: PropTypes.string,
};

export default Deposit;
