// This is your AI's "knowledge base".
// It's data, not logic. This is much easier to maintain.
const knowledgeBase = [
  {
    keywords: ["budget", "budgeting"],
    response:
      "I can help you create a budget! Here's a simple approach:\n\n1. 50/30/20 Rule: Allocate 50% for needs, 30% for wants, and 20% for savings.\n2. Track all your expenses.\n3. Set realistic limits and review monthly.\n\nWould you like me to explain any of these steps in detail?",
  },
  {
    keywords: ["save", "saving", "strategies"],
    response:
      "Great question! Here are proven ways to save money:\n\n1. Automate savings\n2. Track expenses\n3. Cut unused subscriptions\n4. Cook at home\n5. Use the 24-hour rule for non-essential purchases.\n\nWhat area would you like to focus on?",
  },
  {
    keywords: ["invest", "investment", "investing", "basics"],
    response:
      "Investing is a great way to grow wealth!\n\n1. Emergency Fund First: Save 3-6 months of expenses.\n2. Start Small: Use index funds or ETFs.\n3. Think Long-term: Don't panic during market dips.\n\n*Remember: I'm an AI, not a financial advisor. Consider consulting a professional for personalized advice.*",
  },
  {
    keywords: ["debt", "pay off"],
    response:
      "Managing debt effectively:\n\n1. List all debts: Know what you owe.\n2. Debt Avalanche: Pay off highest interest rate first.\n3. Debt Snowball: Pay off smallest balance first for motivation.\n\nWhich method sounds better for you?",
  },
  {
    keywords: ["emergency fund"],
    response:
      "An emergency fund is crucial! \n\n1. Goal: Save 3-6 months of living expenses.\n2. Start small: Even $500 is a great start.\n3. Automate it: Set up automatic monthly transfers.\n4. Keep it accessible: Use a high-yield savings account.",
  },
  {
    keywords: ["transaction", "expense"],
    response:
      "I can help you understand your expenses better!\n\n- Check the Transactions page to see all spending.\n- Set up Budgets to control spending.\n\nIs there a specific category you're concerned about?",
  },
];

// This is the "default" response if no keywords are matched.
const defaultResponse =
  "I'm here to help with:\n\nBudgeting\nSaving\nInvesting\nDebt Management\nEmergency Funds\nExpense Tracking\n\nWhat would you like to know more about?";

const getAIResponse = (query) => {
  const lowerQuery = query.toLowerCase();

  // Find the first entry where at least one keyword matches
  const matchingEntry = knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => lowerQuery.includes(keyword))
  );

  return matchingEntry ? matchingEntry.response : defaultResponse;
};

export const fetchAIResponse = (query) => {
  return new Promise((resolve) => {
    // Simulate a more realistic, variable network delay
    const delay = Math.random() * 800 + 500; // between 500ms and 1300ms

    setTimeout(() => {
      resolve(getAIResponse(query));
    }, delay);
  });
};
