const fs = require('fs');
const path = require('path');
const rgblib = require('rgb-lib');
const cfg = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function aiLog(msg) {
  console.log(`🤖 AI: ${msg}`);
}

async function main() {
  aiLog("Starting RGB Testnet Demo...");

  // 1) Generate issuer keys
  const issuerKeys = rgblib.generateKeys(rgblib.BitcoinNetwork.Testnet);
  aiLog(`Issuer public key: ${issuerKeys.public}`);

  // 2) Token definition
  const tokenDef = {
    name: 'DemoToken',
    ticker: 'DMT',
    precision: 2,
    supply: 1000000
  };

  // 3) Create contract
  const contract = await rgblib.contractCreate({
    bitcoinNetwork: rgblib.BitcoinNetwork.Testnet,
    issuerKeys,
    tokenDefinition: tokenDef
  });

  // 4) Commit to Bitcoin
  const anchor = await rgblib.contractCommit({
    contract,
    bitcoinNetwork: rgblib.BitcoinNetwork.Testnet,
    bitcoinNode: {
      rpcUser: cfg.bitcoin.rpc.user,
      rpcPass: cfg.bitcoin.rpc.pass,
      rpcUrl: `http://${cfg.bitcoin.rpc.host}:${cfg.bitcoin.rpc.port}`
    }
  });
  aiLog(`Anchor TXID: ${anchor.txid}`);

  // 5) Export consignment
  const consignment = await rgblib.contractExportConsignment(contract);
  const outputPath = path.join(__dirname, 'demo-consignment.rgb');
  fs.writeFileSync(outputPath, consignment);
  aiLog(`Consignment saved: ${outputPath}`);

  // 6) Verify consignment
  const result = await rgblib.contractVerifyConsignment(consignment, {
    bitcoinNetwork: rgblib.BitcoinNetwork.Testnet
  });

  if (result.valid) {
    aiLog("✅ Verification succeeded");
  } else {
    aiLog("❌ Verification failed");
    console.error(result.errors);
  }
}

main().catch(err => {
  console.error("Fatal error:", err);
});
