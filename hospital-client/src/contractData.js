export let examinationContractABI = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_patientData",
                type: "string"
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes"
            },
            {
                internalType: "string",
                name: "_patientPassPhrase",
                type: "string"
            },
            {
                internalType: "address",
                name: "_hospitalAddress",
                type: "address"
            },
            {
                internalType: "address",
                name: "_tokenAddress",
                type: "address"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "string",
                name: "note",
                type: "string"
            }
        ],
        name: "AddMedicalNote",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "eventName",
                type: "string"
            },
            {
                indexed: false,
                internalType: "string",
                name: "message",
                type: "string"
            }
        ],
        name: "EventFailed",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "medicalCost",
                type: "uint256"
            }
        ],
        name: "SetMedicalCost",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bool",
                name: "signed",
                type: "bool"
            }
        ],
        name: "SignMedicalCost",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "unpaidCost",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "paidToHospital",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "paidToPatient",
                type: "uint256"
            }
        ],
        name: "WithDraw",
        type: "event"
    },
    {
        payable: false,
        stateMutability: "nonpayable",
        type: "fallback"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "string",
                name: "_note",
                type: "string"
            }
        ],
        name: "addMedicalNote",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getMedicalNotes",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "note",
                        type: "string"
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256"
                    }
                ],
                internalType: "struct Examination.MedicalNote[]",
                name: "",
                type: "tuple[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getPatientAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getPatientInfo",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
            {
                internalType: "string",
                name: "",
                type: "string"
            },
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getPaymentStatus",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getTokenData",
        outputs: [
            {
                internalType: "string",
                name: "name",
                type: "string"
            },
            {
                internalType: "string",
                name: "symbol",
                type: "string"
            },
            {
                internalType: "uint8",
                name: "decimals",
                type: "uint8"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getUsedEther",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "medicalNotes",
        outputs: [
            {
                internalType: "string",
                name: "note",
                type: "string"
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "_medicalCost",
                type: "uint256"
            }
        ],
        name: "setMedicalCost",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes"
            }
        ],
        name: "signMedicalCost",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "withDraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    }
];

export let managementContractABI = [
    {
        constant: false,
        inputs: [
            {
                internalType: "string",
                name: "_patientData",
                type: "string"
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes"
            },
            {
                internalType: "string",
                name: "_patientPassPhrase",
                type: "string"
            },
            {
                internalType: "address",
                name: "_tokenAddress",
                type: "address"
            },
            {
                internalType: "uint32",
                name: "_random",
                type: "uint32"
            }
        ],
        name: "startExamination",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "contractAddress",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "hospitalAddress",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "patientAddress",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "tokenAddress",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint32",
                name: "random",
                type: "uint32"
            }
        ],
        name: "StartExamination",
        type: "event"
    },
    {
        constant: true,
        inputs: [],
        name: "getExaminationList",
        outputs: [
            {
                components: [
                    {
                        internalType: "contract Examination",
                        name: "examinationContract",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "start",
                        type: "uint256"
                    }
                ],
                internalType: "struct Management.ExaminationInfo[]",
                name: "",
                type: "tuple[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    }
];

export let managementContractAddress =
    "0x784E422EaF65Fd8BEfcF2A6EA8fe651047c343E5";

export let erc20tokenABI = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" }
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "sender", type: "address" },
            { name: "recipient", type: "address" },
            { name: "amount", type: "uint256" }
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "spender", type: "address" },
            { name: "addedValue", type: "uint256" }
        ],
        name: "increaseAllowance",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "spender", type: "address" },
            { name: "subtractedValue", type: "uint256" }
        ],
        name: "decreaseAllowance",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "recipient", type: "address" },
            { name: "amount", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" }
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { name: "_name", type: "string" },
            { name: "_symbol", type: "string" },
            { name: "_decimals", type: "uint8" },
            { name: "_value", type: "uint256" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" }
        ],
        name: "Transfer",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "spender", type: "address" },
            { indexed: false, name: "value", type: "uint256" }
        ],
        name: "Approval",
        type: "event"
    }
];
