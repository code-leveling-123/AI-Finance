import { TrendingUp, TrendingDown, Trash2 } from "lucide-react";

const TransactionItem = ({ transaction, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            transaction.type === "income"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {transaction.type === "income" ? (
            <TrendingUp className="w-5 h-5" />
          ) : (
            <TrendingDown className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">
            {transaction.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {transaction.date} • {transaction.category}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`font-bold text-lg flex-shrink-0 ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
          {Math.abs(transaction.amount).toFixed(2)}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
