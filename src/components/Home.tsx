import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { MintButton } from '../MintButton';

import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
  shortenAddress
} from '../candy-machine';

const ConnectButton = styled(WalletDialogButton)`background-color: #c33436 !important`;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

/* const MintButton = styled(Button)``; // add your styles here */

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey;
  fairLaunchId?: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  txTimeout: number;
  rpcHost: string;
}

const Home = (props: HomeProps) => {
  const [yourSOLBalance, setYourSOLBalance] = useState<number | null>(null);
  const rpcUrl = props.rpcHost;

  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [displayAddress, setDisplayAddress] = useState("");

  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  });

  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();

  const onMint = async () => {
    try {
      setIsMinting(true);
      document.getElementById('#identity')?.click();
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {

        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            props.txTimeout,
            props.connection,
            'singleGossip',
            true,
          );
        }

        if (!status?.err) {
          setAlertState({
            open: true,
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
          });
        } else {
          setAlertState({
            open: true,
            message: 'Mint failed! Please try again!',
            severity: 'error',
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || 'Minting failed! Please try again!';
      if (!error.msg) {
        if (!error.message) {
          message = 'Transaction Timeout! Please try again.';
        } else if (error.message.indexOf('0x138')) {
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: 'error',
      });
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!anchorWallet) {
        return;
      }
      const balance = await props.connection.getBalance(
        anchorWallet.publicKey,
      );
      setYourSOLBalance(balance / 1000000000);
      
      if (props.candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            props.candyMachineId,
            props.connection,
          );
          setCandyMachine(cndy);
          setDisplayAddress(shortenAddress(wallet.publicKey?.toBase58() || ""));
        } catch (e) {
          console.log('Problem getting candy machine state');
          console.log(e);
        }
      } else {
        console.log('No candy machine detected in configuration.');
      }
    })();
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    props.fairLaunchId,
  ]);

  return (
    <main>
      {anchorWallet && (
        <p>Wallet: {shortenAddress(anchorWallet.publicKey?.toBase58() || "")}</p>
      )}

      {anchorWallet && <p>Balance: {(yourSOLBalance || 0).toLocaleString()} SOL</p>}

      {anchorWallet && <p>Total Available: {candyMachine?.state.itemsAvailable}</p>}

      {anchorWallet && <p>Redeemed: {candyMachine?.state.itemsRedeemed}</p>}

      {anchorWallet && <p>Remaining: {candyMachine?.state.itemsRemaining}</p>}

      <MintContainer>
        {!anchorWallet ? (
          <ConnectButton>Connect Wallet</ConnectButton>
        ) : (
          <MintButton
          candyMachine={candyMachine}
          isMinting={isMinting}
          onMint={onMint}
        />
        )}
      </MintContainer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
