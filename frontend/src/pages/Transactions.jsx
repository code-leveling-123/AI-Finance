import { Plus, Search, CreditCard } from "lucide-react";
import TransactionItem from "../components/dashboard/TransactionItem";

const Transactions = ({
  transactions,
  onDelete,
  onAdd,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
}) => {
  return (
    <div className="space-y-6">
      {/* Mobile Search */}
      <div className="md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              All Transactions
            </h2>
            <p className="text-sm text-gray-500">
              {transactions.length} total transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No transactions yet</p>
              <button
                onClick={onAdd}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Add your first transaction
              </button>
            </div>
          ) : (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
