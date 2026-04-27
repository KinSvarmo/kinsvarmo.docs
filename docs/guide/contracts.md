# Smart contracts

Three contracts govern the on-chain lifecycle on **0G Galileo Testnet** (chainId `16602`).

## INFTRegistry

Mints agents as ERC-7857 intelligence NFTs. Stores the encrypted script URI and metadata hash per token. Handles ownership and transfer.

**Key functions:**

```solidity
/// Mint a new agent iNFT. Returns the token ID.
function mint(bytes32 metadataHash, string calldata encryptedURI)
  external returns (uint256 tokenId)

/// Read the encrypted script URI for a token.
function getEncryptedURI(uint256 tokenId)
  external view returns (string memory)

/// Standard ERC-721 owner lookup.
function ownerOf(uint256 tokenId)
  external view returns (address)
```

## AnalysisEscrow

Holds the user's payment when a job starts. Releases it to the agent creator when the Reporter delivers a result. Refunds the user on job failure.

**Key functions:**

```solidity
/// Lock funds for a job. Called by the frontend on job start.
function createJob(
  uint256 agentTokenId,
  string calldata datasetReference,
  uint256 priceIn0G
) external payable

/// Read the current state of an escrowed job.
function getJobState(bytes32 jobId)
  external view returns (JobState)
```

## UsageAuthorizationManager

Verifies that an execution module is authorized to decrypt and run an agent. Intended for TEE-gated environments where the caller must prove it is running inside a trusted enclave before the script URI is decrypted.

## Addresses

::: warning Pending deployment
Contracts are pending deployment. Addresses will be added here after final deployment to 0G Galileo Testnet before submission.
:::

| Contract | Address |
|---|---|
| `INFTRegistry` | Pending |
| `AnalysisEscrow` | Pending |
| `UsageAuthorizationManager` | Pending |

ABIs and TypeScript types are in `packages/contracts`. Import them directly:

```ts
import { INFTRegistry__factory } from "@kinsvarmo/contracts";
```
