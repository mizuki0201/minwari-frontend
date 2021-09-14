import { CalcArray, Debt, Expence, Member } from "../types/types";

type Props = {
  debts: Debt[];
  members: Member[];
  expences: Expence[];
};

export const useCalc = () => {
  const calc = (props: Props) => {
    const { debts, members, expences } = props;
    const allCalcResult: CalcArray[] = [];
    const sumExpences: CalcArray[] = [];
    const memberNum = members.length;

    members.map((member) => {
      let userExpence = 0;
      expences.map((expence) => {
        if (expence.user_id === member.id) {
          let paidExpence =
            Math.floor(expence.price / memberNum) * (memberNum - 1);
          userExpence += paidExpence;
        }
      });
      sumExpences.push({
        debtPrice: userExpence,
        userId: member.id,
        userName: member.name,
      });
    });

    sumExpences.map((sumExpence) => {
      debts.map((debt) => {
        if (debt.to_id === sumExpence.userId) {
          sumExpence.debtPrice -= debt.price;
        }
      });
      allCalcResult.push({
        debtPrice: sumExpence.debtPrice,
        userId: sumExpence.userId,
        userName: sumExpence.userName,
      });
    });

    return allCalcResult;
  };

  return { calc };
};
