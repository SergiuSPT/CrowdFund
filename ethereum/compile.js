const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // Clean up old build files

// Read the source files
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const campaignSource = fs.readFileSync(campaignPath, 'utf8');

const factoryPath = path.resolve(__dirname, 'contracts', 'Factory.sol');
const factorySource = fs.readFileSync(factoryPath, 'utf8');

// Prepare input format for solc (standard JSON input)
const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': { content: campaignSource },
    'Factory.sol': { content: factorySource },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
};

// Compile
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Ensure build directory exists
fs.ensureDirSync(buildPath);

// Write each contract to a separate .json file
for (let file in output.contracts) {
  for (let contractName in output.contracts[file]) {
    const contract = output.contracts[file][contractName];
    const fileName = `${contractName}.json`;
    fs.outputJsonSync(
      path.resolve(buildPath, fileName),
      {
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object,
      }
    );
    console.log(`✅ Compiled & wrote: ${fileName}`);
  }
}
