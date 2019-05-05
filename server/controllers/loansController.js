import loansModel from '../model/loansModel';
import ResponseHelper from '../helpers/responseHelper';
import Utils from '../helpers/utils';
import errorStrings from '../helpers/errorStrings';

/**
* @fileOverview - class manages all users logic
* @class - LoansController
* @requires - ../model/loansModel
* @requires - ../helpers/token
* @requires - ../helpers/utils
* @exports - loansController.js
* */

class LoansController {
  /**
     * Create a loan application
     * @param {object} req
     * @param {object} res
     */

  static createLoan(req, res) {
    const userEmail = req.token.user.email;
    const currentLoan = loansModel.checkCurrentLoan(userEmail);

    if (currentLoan.isFound === true) {
      ResponseHelper.error(res, 406, `You have an unpaid loan of ${currentLoan.foundLoan.amount} which is under review or yet to be fully repaid`);
    } else {
      const newLoan = loansModel.createLoan(req, userEmail);

      return res.status(201).send({
        status: 201,
        data: {
          loanId: newLoan.id,
          user: newLoan.user,
          createdOn: newLoan.createdOn,
          status: newLoan.status,
          repaid: newLoan.repaid,
          tenor: newLoan.tenor,
          amount: newLoan.amount,
          paymentInstallment: newLoan.paymentInstallment,
          balance: newLoan.balance,
          interest: newLoan.interest,
        },
      });
    }
    return null;
  }

  /**
     * Get all loan applications
     * @param {object} req
     * @param {object} res
     * @returns {object} json response object
     */

  static getLoans(req, res) {
    let allLoans = {};
    const userEmail = req.token.user.email;
    const { isAdmin } = req.token.user;

    allLoans = loansModel.getLoans(userEmail, isAdmin);

    if (Utils.checkLength(allLoans) > 0) {
      return ResponseHelper.success(res, 200, allLoans);
    }
    return ResponseHelper.error(res, 406, errorStrings.noLoans);
  }
}

export default LoansController;
