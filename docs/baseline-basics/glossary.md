# Glossary

## Key Concepts

### Baseline Protocol

A set of components and procedures that allows separate systems of record to maintain record consistency and workflow integrity by using the public Ethereum Mainnet as a common frame of reference \(CFR\).

### Atomic Compartmentalization

Even counterparties to the same business-to-business Workflow typically must not have access to -- or even awareness of -- processes that they are not directly involved in. A Workflow that can restrict access and awareness with levels of granularity as fine as a single Step or Record with regard to a specific set of Parties has achieved "atomic compartmentalization". With the Mainnet, this kind of compartmentalization can be said to be "silo-less" because, while each Step in a Workflow can restrict awareness and access, different Workflows -- even ones created and operated separately over a long period -- can integrate Steps. Workflow A can pass parameters between its Step A\#33 with Workflow B's Step B\#22 if done with care, and the logic and data can be made compatible. There still exists tasks necessary to integrate the different Workflows, but because they are all baselined on the same Mainnet, this can be done at the application/business-process level. One need not contact a network administrator to set up a new channel or ascertain which private blockchain network will be primary.

### **Mainnet**

The Mainnet is an always-on state machine that is maintained as a public good in such a way that it maximizes resistance toward an individual or group attempting to gain control, lock out users from valid functions, or alter the existing history. 

The term Mainnet is capitalized to emphasize its relationship to the capitalized term Internet. Usage of the term mainnet without capitalization is done so in distinguishing a public production network from public testnets. For example, the Ethereum mainnet vs. its testnets, such as ropsten.

### Middleware

There exist a large variety of forms corresponding to the general use term "middleware". In context of the Baseline Protocol a reference to middleware is unique. Systems of record maintained by legally separate entities require a common frame of reference in order to achieve business process integration across them. This commone frame of reference is subject to issues, such as Flow control, ensuring that two processes don't run inappropriately against the same shared state, terminating the back and forth of the [two generals problem](https://en.wikipedia.org/wiki/Two_Generals%27_Problem), non-repudiation, etc. In this context, the protocol primarily seeks to accomplish loose-coupling architecture in the transaction-processing middleware \(TPM\) layer. Said layer's focus is not necessarily schema translators, though a typical system would very likely run CRUD access between a baseline server and a system of record through translation services in a traditional Enterprise Service Bus \(ESB\).The Baseline Protocol is, unlike some RPC middleware, asynchronous, therefore passing parameters between functions running on two or more remote machines while ensuring consistency between said machines.

A common pattern inside Baseline is to use a connection between two System of Records by an established standard. The baseline "middleware" part would then extend this standard connection by an additional, standardized connection to the mainnet, to anchor and verify baseline compliant proofs. The combination of established off-chain- and on-chain connection define the complete middleware in this scenario. For example, when baselining two SAP systems, the communication between the two systems could be using standard iDoc interfaces and SAP-PI middleware.

WIP section - Placeholder for future updates

## Baseline Protocol Components and Conventions

### Workgroup

A set of Parties \(defined in the OrgRegistry\) when a Registrar factory smart contract is called to start a Workflow.

### Workflow

A series of Steps that constitute a coherent business process between a set of counter-parties in a Workflow.

### Workstep

A discrete _baselined_ Record/Function/BusinessEvent/Document \(e.g,. RFP, MSA, PO\) within a Workflow that implements a set of baseline Tasks.

### Task

Different Workflow Steps implement either all or a subset of Tasks, such as selecting a set of counter-parties, serializing a record, sending messages, sometimes executing off-chain functions \(not in Radish34, but definitely in protocol-compliant stack\), executing and sending/receiving EdDSA sigs, invoking ZK service, sometimes ensuring that the ZK circuit \(or a code package/container in a non-Radish34 implementation\) of a previous Step is executed correctly \(only for Steps that follow previous steps that enforce 'entanglement'\), etc. The set of Tasks that a Step implements is called its LifeCycle. Most of these Tasks invoke one or more Components.

### Components

In the Baseline Protocol context, Components are just the general term for services, smart contracts, etc. For exmaple, the ZK service, and messenger and smart contracts. Some of these are not in the current Radish34 implementation as distinct components, but some/all should be constructed in the protocol work.

### Baseline Server

In Radish34, there isn't a coherent "Baseline Server", but in the ultimate reference implementation of the protocol, the set of off-chain Components and APIs for messaging, systems of record, etc. will presumably be packaged as the "Baseline Server".

### Baseline Proof

There are several things passed to the Mainnet, primarily from the ZK Service, in the process of _baselining_ a Workflow Step. An important one is a hash, which is stored in the Shield contract \(created when setting up a WorkGroup by the Registrar "factory" smart contract, along with the OrgRegistry and Validator contract\). This happens when a Step successfully passes the ZK validation process. The Baseline Proof is a "proof of consistency" _token_, and also is used as a state-marker for managing Workflow integrity.

### CodeBook =&gt; Package

During the Radish34 project, the notion of a shared "codebook" was often discussed. This concept refers to a collection of artifacts or library components that enable a business process to be "baselined", but, in general, is extensible to any such components that are subject to a business process. These artifacts, in the case of Radish34 and presumably what would be "importable" components, include the zk-snark based circuits for usage in off chain zkp based proof generation and/or other logical components representing business logic in a workflow process.

### OrgRegistry Contract


Think of the OrgRegistry Contract as a [rolodex](https://en.wikipedia.org/wiki/Rolodex) contacts list. In the future, and in particular when the decentralized identity standard \(DID\) is well established, this can be populated from a global "phone book" of pre-verified organizations..so you know when you add a company to your WorkGroup, you are baselining with the company you think you're working with.

### Shield Contract

The Shield Contract holds a Merkle Tree storing Baseline Proofs. The off-chain ZK Service will send a proof to the Shield contract, which will call the Verifier contract. If the Verifier contract returns 'true', then the stated proof is stored in a leaf on the Merkle Tree.

### Verifier Contract

The Verifier Contract is the on-chain component of the ZK Service, which ensures that a baseline proof is only deposited on the Mainnet if all Counter-parties have performed the Workflow Step consistently and have adhered to the rules of any previous Workflow Step. In the Radish34 POC, a good example of this is the MSA to PO Workflow.

### Baseline Proofs

The hash deposited in a Shield Contract when a Workflow Step successfully completes, representing successful verification on chain of the correctness of a logical statement \(proof\); successful storage of the hash in a Merkle tree within a Shield contract on chain.

## Radish34-Specific Terms

\(work in progress...see [Radish34]() section for full documentation.\)

RFP: Request for proposal is a document issued at the beginning of a business process containing a request for a good transfer placed by a intending buying party. In some cases RFPs are issued in public, and in some cases they are issued in private in a point to point communication mode

Bid/Proposal: The response to an RFP, wherein an intended selling party proposes their acceptance of the RFP, and addition of contractual terms for the intended procurement of goods. These terms vary from use case to use case, and in the case of Radish34 this is represented by a volume discount structure which typically is negotiated between the buying and selling parties

MSA: Master Service Agreement is a document/contract issued to mark the beginning of the procurement process issued by the buying to the selling party and contains the terms agreed upon as in the bid/proposal. Typically, this is a material process and require co-signing of the agreements, that can be verifiable and provable.

PO: Purchase order is a document/token issued to begin the ordering process and that needs to maintain linkage to the MSA and thereby the terms agreed upon in the MSA.

