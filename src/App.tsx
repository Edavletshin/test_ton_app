import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "@ton/core";
import WebApp from '@twa-dev/sdk'


function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert('Hey there!');
  }
  const sendData = () => {
    WebApp.sendData('Hey there!');
  }

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && <div className='Hint'>{fromNano(contract_balance)}</div>}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
        <a
          onClick={() => {
            sendData();
          }}
        >
          Increment
        </a>

        <br />

        <a
          onClick={() => {
            showAlert();
          }}
        >
          Alert
        </a>


        <br />

        {connected && (
          <a
            onClick={() => {
              sendDeposit();
            }}
          >
            Request deposit of 1 ton
          </a>
        )}

        <br />

        {connected && (
          <a
            onClick={() => {
              sendWithdrawalRequest();
            }}
          >
            Request 0.7 TON withdrawal
          </a>
        )}

      </div>
    </div>
  );
}

export default App;