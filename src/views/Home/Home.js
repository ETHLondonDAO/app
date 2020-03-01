import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import useWeb3Connect from '../../utils/useWeb3Connect';
import { Page, WalletProfile } from '../../components';
// import {
//   Intro,
//   Newsletter,
//   PadeleeRegistration,
//   // Team,
//   Partners,
//   Footer,
// } from './components';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Button } from '@material-ui/core';
import SubmitProposal from '../SubmitProposal';
import SvgIcon from '@material-ui/core/SvgIcon';
import useRouter from '../../utils/useRouter';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import useInterval from '../../utils/useInterval';
// function DonateIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="m459.617188 297.273438-94.273438 32.410156c.417969-2.320313.652344-4.6875.652344-7.089844 0-22.054688-17.941406-40-40-40h-64.757813c-1.71875 0-3.414062-.441406-4.910156-1.285156l-52.832031-29.714844c-10.445313-5.886719-22.316406-9-34.328125-9h-70.890625c-4.125-11.636719-15.242188-19.996094-28.277344-19.996094h-60c-5.523438 0-10 4.476563-10 10v179.996094c0 5.523438 4.476562 10 10 10h60c12.738281 0 23.660156-8.003906 27.996094-19.246094 11.320312 1.40625 24.417968 4.753906 32.648437 9.691406l52.296875 31.378907c19.8125 11.890625 42.496094 18.175781 65.605469 18.175781 18.3125 0 36.054687-3.84375 52.738281-11.421875l186.644532-82.183594c20.671874-8.386719 30.878906-33.1875 19.0625-55.046875-8.691407-16.085937-29.046876-23.242187-47.375-16.667968zm-379.617188 95.367187c-.023438 5.492187-4.503906 9.953125-10 9.953125h-50v-159.996094h50c5.511719 0 10 4.484375 10 10zm400.332031-42.148437c-.105469.039062-.210937.085937-.316406.128906 0 0-186.921875 82.304687-186.957031 82.320312-14.082032 6.40625-29.058594 9.652344-44.511719 9.652344-19.484375 0-38.609375-5.296875-55.3125-15.324219l-52.300781-31.378906c-11.195313-6.714844-27.226563-10.808594-40.933594-12.449219v-120.84375h69.167969c8.578125 0 17.054687 2.21875 24.519531 6.425782l52.832031 29.714843c4.476563 2.523438 9.570313 3.859375 14.71875 3.859375h64.757813c11.027344 0 20 8.96875 20 20 0 10.988282-8.976563 20-20 20h-101.65625c-5.523438 0-10 4.476563-10 10 0 5.519532 4.476562 9.996094 10 9.996094h101.65625c6.558594 0 13.015625-1.628906 18.746094-4.683594 0 0 121.542968-41.78125 121.589843-41.796875 8.960938-3.234375 19.09375-.015625 23.066407 7.335938 5.957031 11.019531 1.03125 23-9.066407 27.042969zm0 0" />
//       <path d="m291.246094 243.054688c1.882812 1.628906 4.214844 2.441406 6.550781 2.441406s4.671875-.8125 6.550781-2.441406c81.589844-70.710938 132.058594-106.496094 132.058594-162.105469 0-43.992188-31.144531-80.449219-74.898438-80.449219-28.734374 0-50.738281 16.5625-64.910156 41.417969-14.140625-24.800781-36.121094-41.417969-64.898437-41.417969-33.496094 0-61.5 21.707031-71.34375 55.296875-1.554688 5.300781 1.484375 10.855469 6.785156 12.410156 5.300781 1.554688 10.855469-1.484375 12.40625-6.785156 7.285156-24.859375 27.753906-40.921875 52.152344-40.921875 28.527343 0 48.539062 25.332031 55.261719 48.917969 1.199218 4.332031 5.144531 7.332031 9.636718 7.332031 4.496094 0 8.4375-3 9.636719-7.332031.136719-.488281 14.027344-48.917969 55.273437-48.917969 31.296876 0 54.898438 25.984375 54.898438 60.449219 0 44.484375-43.484375 76.554687-118.617188 141.335937-45.777343-39.3125-82.140624-66.984375-102.808593-94.054687-3.351563-4.390625-9.625-5.234375-14.015625-1.882813-4.390625 3.351563-5.230469 9.625-1.882813 14.019532 23.296875 30.511718 62.625 59.746093 112.164063 102.6875zm0 0" />
//       <path d="m169 88.597656c-5.519531 0-10 4.480469-10 10 0 5.519532 4.480469 10 10 10s10-4.480468 10-10c0-5.519531-4.480469-10-10-10zm0 0" />
//     </SvgIcon>
//   );
// }

import DonateIcon from '@material-ui/icons/AllInclusive';
import Header from '../../components/Header';

const useStyles = makeStyles(theme => ({
  button: {
    margin: 32,
    width: 220,
  },
  // divContainer: {
  //   [theme.breakpoints.up('sm')]: {
  //     backgroundSize: '39%',
  //   },
  // }
}));

const Home = () => {
  const classes = useStyles();
  const web3Connect = useWeb3Connect();
  let connected = web3Connect.connected;
  const router = useRouter();
  const [interest, setInterest] = useState(0);

  useInterval(async () => {
    if (web3Connect) {
      let interest = await web3Connect.contracts.dao.methods.getInterest();
      console.log({ interest });
      setInterest(interest);
    }
  }, 2000);

  return (
    <>
      <Header />
      <Typography variant="body1" style={{ fontSize: 24 }}>
        Every two weeks, the preferred project of the community will receive{' '}
        <span style={{ fontSize: 28, fontWeight: 'bold', color: '#A362A5' }}>
          ${interest}!
        </span>
      </Typography>
      {/* {!connected && ( */}

      <div
        className={classes.divContainer}
        style={{
          marginTop: 32,
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => {
            if (connected) {
              router.history.push('/submit-proposal');
            } else {
              const connect = async () => {
                await web3Connect.triggerConnect();
                debugger;
                router.history.push('/submit-proposal');
              };
              connect();
            }
          }}
        >
          Submit Proposal
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          startIcon={<DonateIcon />}
          onClick={() => {
            router.history.push('/deposit');
          }}
        >
          Fund Projects
        </Button>
      </div>
      <div
        className={classes.divContainer}
        style={{
          marginTop: 32,
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        <Button
          // variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<HowToVoteIcon />}
          onClick={() => {
            if (connected) {
              router.history.push('/proposals');
            } else {
              const connect = async () => {
                await web3Connect.triggerConnect();
                router.history.push('/submit-proposal');
              };
              connect();
            }
          }}
        >
          Vote
        </Button>
      </div>
      {/* )} */}

      {/* {connected && (
        <div
          className={classes.divContainer}
          style={{
            marginTop: 32,
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => {
              if (connected) {
                router.history.push('/submit-proposal');
              } else {
                const connect = async () => {
                  await web3Connect.triggerConnect();
                  debugger;
                  router.history.push('/submit-proposal');
                };
                connect();
              }
            }}
          >
            Submit Proposal
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<DonateIcon />}
            onClick={() => {
              if (connected) {
                router.history.push('/deposit');
              } else {
                const connect = async () => {
                  await web3Connect.triggerConnect();
                  debugger;
                  router.history.push('/deposit');
                };
                connect();
              }
            }}
          >
            Fund Projects
          </Button>
        </div>
      )} */}
      {/* <WalletProfile /> */}
      {/* <SubmitProposal /> */}
    </>
  );
};

export default Home;
