# Sample Hardhat Project

This project demonstrates a basic Hardhat use case to manage proxy contracts. 
It comes with:
 - 3 sample contracts :
    - `Lock_v1.sol` : first version of the implementation contract 
    - `Lock_v2.sol` : updated version of the impelementation contract
    - `ProxyLock.sol` : proxy contract forwarding transaction calls to the implementation contract
  - 2 scripts that deploys and upgrade the proxy:
    - `deploy.js` : Deploys the Lock_v1 implementation contract firts and then the `proxyLock` contract
    - `deployV2.js` : Deploys the Lock_v2 implementation contract and calls the `upgrade` function on the proxy contract to update the implementation logic with the new contract address.
  - a test for the original Lock contract

### _Setup_
Create a `.env` file and provide the in the `PRIVATE_KEY` variable private key of the wallet the will be used to run deployment and upgrades transactions

```shell
PRIVATE_KEY = <YOUR_PRIVATE_KEY>
```


### _Running the scripts_

```javascript
// runs the deploy script
npm run deployProxy

// runs the upgrade of the proxy
npm run upgradeProxy
```
