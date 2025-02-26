import AppCardHistory from '@/components/AppComponents/cards/AppCardHistory';
import Loading from '@/components/GlobalComponents/loading';
import useLoadHistoryCustomer from '@/hooks/useLoadHistoryCustomer';
import useLoadHistoryOperator from '@/hooks/useLoadHistoryOperator';
import React from 'react';

interface HistoryContentProps {
  hidden: boolean;
}



const AppNotificationsContent: React.FC<HistoryContentProps> = ({ hidden }) => {
  const { loading, data } = useLoadHistoryOperator(hidden);

  return (
    <div hidden={hidden}>
      <h1 className="text-black text-3xl font-bold text-center mb-3">Histórico</h1>

      {loading ? (
        <div>
          <Loading text="Buscando dados..." />
        </div>
      ) : (
        <div className="max-h-screen overflow-y-auto p-2 pb-32 flex flex-col">
          {data?.map((item) => (
            <AppCardHistory history={item} />
          ))}
        </div>

      )}
    </div>
  );
};

export default AppNotificationsContent;
