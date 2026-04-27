# Smart contracts

The frontend is prepared for three contracts on **0G Galileo Testnet** (chainId `16602`), but deployment is still pending. Contract calls are intentionally commented out in the main run and creator flows until real addresses replace the placeholders.

## INFTRegistry

Mints agents as ERC-7857 intelligence NFTs. Stores the encrypted script URI and metadata hash per token. Handles ownership and transfer.

**Key functions:**

```solidity
/// Mint a new agent iNFT. Returns the token ID.
function mint(address to, string calldata encryptedURI, bytes32 metadataHash)
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
  string calldata datasetReference
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

The ABI subsets used by the UI are currently in `apps/web/lib/contracts.ts`. Placeholder deployment metadata types live in `packages/contracts`.

```ts
import { INFTRegistryABI, CONTRACT_ADDRESSES } from "@/lib/contracts";
```
