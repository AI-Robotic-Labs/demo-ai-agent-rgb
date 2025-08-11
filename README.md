# RGB Testnet Demo

This is a Node.js example for **issuing an RGB token and verifying a consignment** on Bitcoin testnet using [`rgb-lib`](https://github.com/RGB-Tools/rgb-lib-nodejs).

---

## Prerequisites

- **Node.js** >= 18
- **npm** or **yarn**
- **Bitcoin Core** running in testnet mode with `-txindex=1`
- Some testnet coins in your wallet (via [Bitcoin testnet faucet](https://bitcoinfaucet.uo1.net/))
- RPC enabled in `bitcoin.conf`:

testnet=1
server=1
rpcuser=bitcoinrpc
rpcpassword=yourpassword
rpcallowip=127.0.0.1
txindex=1

- `rgb-lib` installed via npm

---

## Install

```bash
git clone https://github.com/YOUR_GITHUB/rgb-testnet-demo.git
cd rgb-testnet-demo
npm install

Configure

Copy the example config and edit your RPC details:

cp config.json.example config.json

Edit config.json:

{
  "bitcoin": {
    "rpc": {
      "host": "127.0.0.1",
      "port": 18332,
      "user": "bitcoinrpc",
      "pass": "yourpassword"
    }
  }
}

Run the Demo

npm start

Expected output:

🤖 AI: Starting RGB Testnet Demo...
🤖 AI: Issuer public key: tpub...
🤖 AI: Anchor TXID: ...
🤖 AI: Consignment saved: demo-consignment.rgb
🤖 AI: ✅ Verification succeeded

License

MIT


---

## 7️⃣ How to Run Locally

```bash
# 1. Clone repo
git clone https://github.com/YOUR_GITHUB/rgb-testnet-demo.git
cd rgb-testnet-demo

# 2. Install dependencies
npm install

# 3. Configure RPC
cp config.json.example config.json
# edit config.json with your Bitcoin Core testnet RPC creds

# 4. Start demo
npm start
