import CryptoJS from "crypto-js";
import { examinationContractABI, erc20tokenABI } from "./contractData.js";

/** Examination.solに対応したクラス */
export default class {
    /** 初期化
     *  @param management management.jsのクラス
     *  @param examinationContractAddress Examinationコントラクトのアドレス
     */
    constructor(management, examinationContractAddress, erc20tokenAddress) {
        this.management = management;
        this.myAccount = this.management.myAccount;
        this.web3 = this.management.web3;
        this.myContract = new this.web3.eth.Contract(
            examinationContractABI,
            examinationContractAddress
        );
        this.erc20Token = new this.web3.eth.Contract(
            erc20tokenABI,
            erc20tokenAddress
        );
        this.isSigned = false;
    }

    /** イベントの購読設定
     *  @param callBackFunc イベントが発生した時に呼ばれる関数(引数はeventとvalue)
     */
    subscribeEvent(callBackFunc) {
        this.callBackFunc = callBackFunc;
        // Examinationのイベント
        this.subscription1 = this.myContract.events.allEvents(
            {},
            this.processEvent.bind(this)
        );
        // ERC20トークンのイベント
        // ExaminationContract宛てのTransfer
        this.subscription2 = this.erc20Token.events.Transfer(
            { filter: { to: this.myContract.options.address } },
            this.processEvent.bind(this)
        );
    }

    /** Eventを処理してからcallBackFuncに渡す */
    processEvent(error, event) {
        if (error) console.log(error);
        // AddMedicalNoteの復号処理
        if (event.event === "AddMedicalNote") {
            event.returnValues.note = this.management.decrypt(
                event.returnValues.note,
                this.patientPassPhrase
            );
        }
        this.callBackFunc(event.event, event.returnValues);
    }

    /** イベントの購読解除 */
    unload() {
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
    }

    /** 患者の情報を取得
     *  @returns patientAddress 患者のアドレス
     *  @returns patientData 復号された患者の情報
     */
    async getPatientInfo() {
        let patientInfo = await this.myContract.methods.getPatientInfo().call();
        let patientAddress = patientInfo[0];
        let patientData;
        this.patientPassPhrase = this.management.decryptByOwn(patientInfo[2]);
        patientData = this.management.decrypt(
            patientInfo[1],
            this.patientPassPhrase
        );
        return { address: patientAddress, data: patientData };
    }

    /** 医療費の支払いに使うERC20トークンの情報を取得
     *  @returns name トークンの名称
     *  @returns symbol トークンの単位
     *  @returns decimals 小数点以下の桁数
     */
    async getTokenData() {
        return await this.myContract.methods.getTokenData().call();
    }

    /** コントラクトで使用したEther量を取得
     *  @returns Ether量
     */
    async getUsedEther() {
        let usedEther = await this.myContract.methods.getUsedEther().call();
        return this.web3.utils.fromWei(usedEther);
    }

    /** コントラクトの支払い状況の取得
     * @return uint256 デポジット金額
     * @return uint256 登録された医療費
     * @return uint256 未収金金額
     * @return bool 医療費が確定しているか
     */
    async getPaymentStatus() {
        let paymentStatus = await this.myContract.methods
            .getPaymentStatus()
            .call();
        return paymentStatus;
    }

    /** 医療費の登録
     *  @param medicalCost 医療費
     */
    async setMedicalCost(medicalCost) {
        // 整数部と小数部に分解して適当に処理する
        let medicalCostStr = String(medicalCost) + ".00";
        let num = medicalCostStr.split(".");
        medicalCostStr = num[0] + num[1];
        let tokenAmount = this.web3.utils.toBN(Number(medicalCostStr));
        let inputDecimalLen = num[1].length;
        let tokenData = await this.getTokenData();
        let decimals = this.web3.utils.toBN(
            tokenData["decimals"] - inputDecimalLen
        );
        let tokenAmountHex =
            "0x" +
            tokenAmount
                .mul(this.web3.utils.toBN(10).pow(decimals))
                .toString("hex");
        let encodedABI = this.myContract.methods
            .setMedicalCost(tokenAmountHex)
            .encodeABI();
        let gasAmount =
            (await this.myContract.methods
                .setMedicalCost(tokenAmountHex)
                .estimateGas({ from: this.myAccount.address })) + 10000;
        let signedTx = await this.myAccount.signTransaction({
            to: this.myContract.options.address,
            data: encodedABI,
            gas: gasAmount
        });
        let receipt = await this.web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );
        console.log(receipt);
    }

    /** 医療費の確定
     *  @param medicalCost 医療費
     *  @param signature 医療費に対する患者の署名
     *  @param patientAddress 患者のアドレス
     */
    async signMedicalCost(medicalCost, signature, patientAddress) {
        let sigAddress = this.web3.eth.accounts.recover(
            String(medicalCost),
            signature
        );
        if (patientAddress !== sigAddress) {
            throw new Error(sigAddress);
        }
        let encodedABI = this.myContract.methods
            .signMedicalCost(signature)
            .encodeABI();
        let gasAmount =
            (await this.myContract.methods
                .signMedicalCost(signature)
                .estimateGas({ from: this.myAccount.address })) + 10000;
        let signedTx = await this.myAccount.signTransaction({
            to: this.myContract.options.address,
            data: encodedABI,
            gas: gasAmount
        });
        let receipt = await this.web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );
        console.log(receipt);
    }

    /** 医療費の引き出し(病院のみ実行可) */
    async withDraw() {
        let encodedABI = this.myContract.methods.withDraw().encodeABI();
        let gasAmount =
            (await this.myContract.methods
                .withDraw()
                .estimateGas({ from: this.myAccount.address })) + 10000;
        let signedTx = await this.myAccount.signTransaction({
            to: this.myContract.options.address,
            data: encodedABI,
            gas: gasAmount
        });
        let receipt = await this.web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );
        console.log(receipt);
    }

    /** 簡易的な診療記録の書き込み(病院のみ実行可)
     *  @param note {string} 簡易的な診療記録
     */
    async addMedicalNote(note) {
        let encryptedNote = this.management.encrypt(
            note,
            this.patientPassPhrase
        );
        let encodedABI = this.myContract.methods
            .addMedicalNote(encryptedNote)
            .encodeABI();
        let gasAmount =
            (await this.myContract.methods
                .addMedicalNote(encryptedNote)
                .estimateGas({ from: this.myAccount.address })) + 10000;
        let signedTx = await this.myAccount.signTransaction({
            to: this.myContract.options.address,
            data: encodedABI,
            gas: gasAmount
        });
        let receipt = await this.web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );
        console.log(receipt);
    }

    async getMedicalNotes() {
        let medicalNotes = await this.myContract.methods
            .getMedicalNotes()
            .call();
        for (let i = 0; i < medicalNotes.length; i++) {
            medicalNotes[i].timestamp = medicalNotes[i].timestamp;
            medicalNotes[i].note = this.management.decrypt(
                medicalNotes[i].note,
                this.patientPassPhrase
            );
        }
        return medicalNotes;
    }
}
