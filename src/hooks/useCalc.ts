import { CalcArray, Debt, Expence, Member } from "../types/types";

type Props = {
  debts: Debt[];
  members: Member[];
};

export const useCalc = () => {
  const calc = (props: Props) => {
    const { debts, members } = props;
    const calcResult: CalcArray[] = [];

    members.map((member) => {
      let userDebt = 0;
      debts.map((debt) => {
        if (member.id === debt.from_id) {
          // お金を払った側
          userDebt += debt.price;
        } else if (member.id === debt.to_id) {
          // 借金した側
          userDebt -= debt.price;
        }
      });
      calcResult.push({
        debtPrice: userDebt,
        userId: member.id,
        userName: member.name,
      });
    });

    return calcResult;
  };

  return { calc };
};
