import { useState } from "react";
import {
  Camera,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";
import Tesseract from "tesseract.js";

export default function SmartReceiptScanner({ onClose, onAdd }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState(null);
  const [rawText, setRawText] = useState("");
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const findMerchantName = (text) => {
    /**
     * FIXED:
     * - Focus on TOP 3 lines
     * - Filter out logos/symbols
     * - Skip single letters or random characters
     */
    const lines = text.split("\n").filter((line) => line.trim().length > 2);

    // Known store names database
    const knownStores = [
      "walmart",
      "target",
      "costco",
      "amazon",
      "starbucks",
      "mcdonald",
      "dmart",
      "reliance",
      "bigbazaar",
      "more",
      "spencers",
      "apollo",
      "medplus",
      "dominos",
      "kfc",
      "subway",
      "pantaloons",
      "lifestyle",
      "westside",
      "central",
      "max",
      "shoppers stop",
    ];

    // STRICT words to skip (definitely not store names)
    const skipWords = [
      "tax",
      "invoice",
      "bill",
      "receipt",
      "original",
      "duplicate",
      "customer",
      "copy",
      "gstin",
      "gst",
      "pan",
      "fssai",
      "cin",
      "tin",
      "address",
      "phone",
      "tel",
      "email",
      "website",
      "www",
      "http",
      "thank",
      "welcome",
      "visit",
      "store",
      "branch",
      "total",
      "amount",
      "subtotal",
      "discount",
      "savings",
    ];

    console.log("\n=== MERCHANT NAME DETECTION ===");
    console.log("First 5 lines:", lines.slice(0, 5));

    // STEP 1: Check for known store names in first 10 lines
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      const line = lines[i];
      const lineLower = line.toLowerCase();

      for (let store of knownStores) {
        if (lineLower.includes(store)) {
          console.log(`✓ Found known store: ${line}`);
          return line.trim();
        }
      }
    }

    // STEP 2: Look for store name in FIRST 3 LINES ONLY
    for (let i = 0; i < Math.min(3, lines.length); i++) {
      const line = lines[i].trim();
      const lineLower = line.toLowerCase();

      console.log(`Analyzing line ${i}: "${line}"`);

      // ===== NEW: FILTER OUT LOGOS/SYMBOLS =====

      // Skip if just 1-2 characters (likely logo)
      if (line.length < 3) {
        console.log("  ✗ Too short (logo/symbol)");
        continue;
      }

      // Skip if it's just symbols or special characters
      if (/^[^a-zA-Z0-9\s]+$/.test(line)) {
        console.log("  ✗ Just symbols/special chars (logo)");
        continue;
      }

      // Skip if it's mostly symbols (more than 30% non-alphanumeric)
      const symbolCount = (line.match(/[^a-zA-Z0-9\s]/g) || []).length;
      if (symbolCount > line.length * 0.3) {
        console.log("  ✗ Too many symbols (logo)");
        continue;
      }

      // Skip common logo placeholders
      if (/^[A-Z]{1,2}$/.test(line)) {
        // Single or double capital letters (M, TM, etc.)
        console.log("  ✗ Single/double letter (logo)");
        continue;
      }

      // Skip trademark symbols and similar
      if (/[®™©]/.test(line)) {
        console.log("  ✗ Contains trademark symbol");
        continue;
      }

      // Skip if line is just repeated characters
      if (/^(.)\1+$/.test(line)) {
        // e.g., "===", "---", "***"
        console.log("  ✗ Repeated characters");
        continue;
      }

      // ===== END LOGO FILTERS =====

      // Skip if it's just numbers, dates, or basic symbols
      if (/^[\d\s\-\/\.:,]+$/.test(line)) {
        console.log("  ✗ Just numbers/dates");
        continue;
      }

      // Skip if contains skip words
      if (skipWords.some((word) => lineLower.includes(word))) {
        console.log("  ✗ Contains skip word");
        continue;
      }

      // Skip if too many numbers (addresses, phone numbers)
      const numCount = (line.match(/\d/g) || []).length;
      if (numCount > 3) {
        console.log("  ✗ Too many numbers");
        continue;
      }

      // Skip if looks like an address
      if (
        line.length > 50 ||
        /road|street|avenue|floor|building|plot|sector|lane|block/i.test(line)
      ) {
        console.log("  ✗ Looks like address");
        continue;
      }

      // Calculate letter count - must be mostly letters
      const letterCount = (line.match(/[a-zA-Z]/g) || []).length;
      if (letterCount < 3) {
        console.log("  ✗ Too few letters");
        continue;
      }

      // PREFER if line is ALL CAPS (common for store names)
      const isAllCaps = line === line.toUpperCase() && /[A-Z]{3,}/.test(line);

      // PREFER if line is Title Case
      const isTitleCase = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(line);

      // PREFER if line is short and sweet (3-35 characters)
      const isGoodLength = line.length >= 3 && line.length <= 35;

      // Check if mostly letters (store names are primarily text)
      const isMostlyLetters = letterCount >= line.length * 0.6;

      // Calculate score
      let score = 0;
      if (isAllCaps) score += 3;
      if (isTitleCase) score += 2;
      if (isGoodLength) score += 2;
      if (isMostlyLetters) score += 1;
      if (i === 0) score += 2; // First line bonus
      if (i === 1) score += 1; // Second line bonus

      console.log(
        `  Score: ${score} (caps:${isAllCaps}, title:${isTitleCase}, len:${isGoodLength}, letters:${letterCount})`
      );

      // If score is good enough, use this as merchant name
      if (score >= 4) {
        console.log(`✓ Selected: "${line}" (score: ${score})`);
        return line;
      }
    }

    // STEP 3: Fallback - take first valid text line from top 3
    for (let i = 0; i < Math.min(3, lines.length); i++) {
      const line = lines[i].trim();
      const letterCount = (line.match(/[a-zA-Z]/g) || []).length;

      if (line.length >= 5 && line.length <= 40 && letterCount >= 3) {
        console.log(`✓ Fallback selected: "${line}"`);
        return line;
      }
    }

    console.log("✗ No merchant name found");
    return "Unknown Store";
  };

  const findTotalAmount = (text) => {
    /**
     * FIXED: Explicitly exclude SUBTOTAL, prioritize TOTAL/GRAND TOTAL
     * (REMOVED DUPLICATE - KEEPING ONLY THIS ONE)
     */
    const lines = text.split("\n");

    // Priority keywords - HIGHER number = HIGHER priority
    const totalKeywords = [
      { keyword: "balance due", priority: 11 },
      { keyword: "grand total", priority: 10 },
      { keyword: "net total", priority: 9 },
      { keyword: "total amount", priority: 8 },
      { keyword: "amount payable", priority: 8 },
      { keyword: "bill amount", priority: 7 },
      { keyword: "net amount", priority: 6 },
      { keyword: "total due", priority: 6 },
      { keyword: "amount due", priority: 6 },
      { keyword: "total:", priority: 5 },
      { keyword: "total ", priority: 4 },
      { keyword: "amount", priority: 2 },
      { keyword: "balance", priority: 1 },
      { keyword: "कुल राशि", priority: 9 },
      { keyword: "कुल", priority: 5 },
    ];

    // EXCLUDE these keywords completely
    const excludeKeywords = [
      "sub total",
      "subtotal",
      "sub-total",
      "sub:",
      "sub ",
      "cash",
      "tendered",
      "tender",
      "paid",
      "change",
      "change due",
      "you saved",
      "you save",
      "savings",
      "discount",
      "off",
      "given",
      "received",
    ];

    let bestAmount = null;
    let bestPriority = -1;
    let allFoundAmounts = [];

    console.log("\n=== AMOUNT DETECTION ===");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineLower = line.toLowerCase().trim();

      // Check if line should be excluded
      let shouldExclude = false;
      for (let excludeWord of excludeKeywords) {
        if (lineLower.includes(excludeWord)) {
          console.log(`✗ Excluded: "${line}" (contains "${excludeWord}")`);
          shouldExclude = true;
          break;
        }
      }

      if (shouldExclude) continue;

      // Check for total keywords
      for (let { keyword, priority } of totalKeywords) {
        if (lineLower.includes(keyword)) {
          const amounts = extractAmountsFixed(line);

          // Check next line too
          if (i + 1 < lines.length) {
            const nextLine = lines[i + 1];
            const nextLineLower = nextLine.toLowerCase();

            if (!excludeKeywords.some((ex) => nextLineLower.includes(ex))) {
              amounts.push(...extractAmountsFixed(nextLine));
            }
          }

          if (amounts.length > 0) {
            const amount = Math.max(...amounts);

            allFoundAmounts.push({
              line: line.trim(),
              keyword: keyword,
              amount: amount,
              priority: priority,
            });

            console.log(
              `Found: ₹${amount} via "${keyword}" (priority ${priority})`
            );

            if (
              priority > bestPriority ||
              (priority === bestPriority && amount > bestAmount)
            ) {
              bestAmount = amount;
              bestPriority = priority;
              console.log(`  ✓ New best: ₹${amount}`);
            }
          }
        }
      }
    }

    setDebugInfo({
      foundAmounts: allFoundAmounts,
      selected: bestAmount,
    });

    console.log("\n=== FINAL SELECTION ===");
    console.log(`Selected: ₹${bestAmount} (priority ${bestPriority})`);
    console.log("All found:", allFoundAmounts);

    return bestAmount || 0;
  };

  const extractAmountsFixed = (text) => {
    const decimalPattern = /(\d{1,3}(?:,\d{3})*\.\d{2})/g;
    const decimalMatches = text.match(decimalPattern) || [];

    const currencyPattern = /[₹Rs\.]?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    const currencyMatches = [...text.matchAll(currencyPattern)].map(
      (m) => m[1]
    );

    const allMatches = [...decimalMatches, ...currencyMatches];

    const amounts = allMatches
      .map((num) => {
        const cleaned = num.replace(/,/g, "");
        const parsed = parseFloat(cleaned);

        if (parsed < 1 || parsed > 100000) {
          if (parsed > 1000 && parsed % 100 === 0) {
            const divided = parsed / 100;
            if (divided >= 1 && divided <= 10000) {
              console.log(`Fixed amount: ${parsed} -> ${divided}`);
              return divided;
            }
          }
          return null;
        }

        return parsed;
      })
      .filter((num) => num !== null && !isNaN(num) && num > 0);

    return [...new Set(amounts)];
  };

  const findDate = (text) => {
    const patterns = [
      /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/,
      /\b(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})\b/,
      /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2})\b/,
    ];

    for (let pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          let day, month, year;

          if (pattern === patterns[1]) {
            [, year, month, day] = match;
          } else {
            [, day, month, year] = match;
          }

          if (year.length === 2) {
            year = parseInt(year) > 50 ? `19${year}` : `20${year}`;
          }

          const m = parseInt(month);
          const d = parseInt(day);

          if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
          }
        } catch (e) {
          continue;
        }
      }
    }

    return new Date().toISOString().split("T")[0];
  };

  const guessCategory = (merchantName, text) => {
    const combined = (merchantName + " " + text).toLowerCase();

    const categories = {
      "Food & Dining": [
        "restaurant",
        "cafe",
        "coffee",
        "pizza",
        "burger",
        "food",
        "kitchen",
        "dhaba",
        "hotel",
        "sweets",
        "bakery",
        "juice",
        "starbucks",
        "mcdonald",
        "domino",
        "kfc",
        "subway",
        "bar",
        "dine",
        "eat",
        "bistro",
        "grill",
      ],
      Groceries: [
        "supermarket",
        "grocery",
        "kirana",
        "store",
        "mart",
        "reliance",
        "dmart",
        "bigbazaar",
        "more",
        "walmart",
        "vegetables",
        "fruits",
        "provision",
        "costco",
        "target",
        "fresh",
        "market",
      ],
      Medical: [
        "pharmacy",
        "medical",
        "clinic",
        "hospital",
        "doctor",
        "medicine",
        "health",
        "apollo",
        "tablet",
        "syrup",
        "medplus",
        "drug",
        "chemist",
      ],
      Transport: [
        "uber",
        "ola",
        "taxi",
        "cab",
        "fuel",
        "petrol",
        "gas",
        "diesel",
        "rapido",
        "auto",
        "metro",
        "bus",
        "parking",
      ],
      Shopping: [
        "fashion",
        "clothes",
        "shop",
        "mall",
        "retail",
        "amazon",
        "flipkart",
        "myntra",
        "lifestyle",
        "pantaloons",
        "electronics",
        "mobile",
        "laptop",
      ],
      "Bills & Utilities": [
        "electricity",
        "water",
        "gas",
        "mobile",
        "recharge",
        "broadband",
        "internet",
        "bill",
        "payment",
        "utility",
      ],
      Entertainment: [
        "movie",
        "cinema",
        "pvr",
        "inox",
        "theatre",
        "netflix",
        "prime",
        "spotify",
        "game",
        "park",
        "fun",
      ],
    };

    for (let [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => combined.includes(keyword))) {
        return category;
      }
    }

    return "Other";
  };

  const isActuallyReceipt = (text) => {
    const receiptIndicators = [
      "total",
      "amount",
      "bill",
      "receipt",
      "invoice",
      "tax",
      "gst",
      "payment",
      "paid",
      "subtotal",
      "date",
      "time",
      "कुल",
      "बिल",
      "रसीद",
    ];

    const lowerText = text.toLowerCase();
    const matches = receiptIndicators.filter((word) =>
      lowerText.includes(word)
    ).length;
    const hasNumbers = /\d+/.test(text);

    return matches >= 2 && hasNumbers && text.length > 20;
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setScanning(true);
    setError(null);
    setProgress(0);
    setDebugInfo(null);

    try {
      const result = await Tesseract.recognize(selectedFile, "eng+hin", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const text = result.data.text;
      console.log("\n=== EXTRACTED TEXT ===");
      console.log(text);
      console.log("======================\n");

      setRawText(text);

      if (!isActuallyReceipt(text)) {
        setError(
          "This doesn't look like a receipt. Please upload a valid receipt image."
        );
        setScanning(false);
        return;
      }

      const merchant = findMerchantName(text);
      const amount = findTotalAmount(text);
      const date = findDate(text);
      const category = guessCategory(merchant, text);

      let confidence = "Low";
      if (amount > 0 && merchant !== "Unknown Store") {
        confidence = "High";
      } else if (amount > 0 || merchant !== "Unknown Store") {
        confidence = "Medium";
      }

      console.log("\n=== PARSED DATA ===");
      console.log("Merchant:", merchant);
      console.log("Amount:", amount);
      console.log("Date:", date);
      console.log("Category:", category);
      console.log("Confidence:", confidence);
      console.log("===================\n");

      setExtractedData({
        merchant,
        amount: amount.toFixed(2),
        date,
        category,
        confidence,
      });
    } catch (err) {
      console.error("OCR Error:", err);
      setError("Failed to scan receipt. Please try a clearer image.");
    } finally {
      setScanning(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setExtractedData(null);
      setRawText("");
      setDebugInfo(null);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddTransaction = () => {
    if (extractedData) {
      onAdd({
        name: extractedData.merchant,
        amount: -parseFloat(extractedData.amount),
        category: extractedData.category,
        date: extractedData.date,
        type: "expense",
      });
      onClose();
    }
  };

  const handleFieldChange = (field, value) => {
    setExtractedData({
      ...extractedData,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Receipt Scanner
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Upload a receipt photo</p>
              <label className="cursor-pointer">
                <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>JPG, PNG formats</p>
                <p>For best results: good lighting, flat surface</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={preview}
                    alt="Receipt"
                    className="w-full h-64 object-contain bg-gray-50"
                  />
                </div>

                {!extractedData && !scanning && (
                  <button
                    onClick={handleScan}
                    className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Scan Receipt
                  </button>
                )}
              </div>

              <div>
                {scanning && (
                  <div className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">
                      Scanning receipt...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{progress}%</p>
                  </div>
                )}

                {extractedData && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">
                          Store Name
                        </label>
                        <input
                          type="text"
                          value={extractedData.merchant}
                          onChange={(e) =>
                            handleFieldChange("merchant", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Walmart, Local Store"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">
                          Total Amount (₹)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={extractedData.amount}
                          onChange={(e) =>
                            handleFieldChange("amount", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">
                          Date
                        </label>
                        <input
                          type="date"
                          value={extractedData.date}
                          onChange={(e) =>
                            handleFieldChange("date", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">
                          Category
                        </label>
                        <select
                          value={extractedData.category}
                          onChange={(e) =>
                            handleFieldChange("category", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Food & Dining</option>
                          <option>Groceries</option>
                          <option>Medical</option>
                          <option>Transport</option>
                          <option>Shopping</option>
                          <option>Bills & Utilities</option>
                          <option>Entertainment</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => {
                          setPreview(null);
                          setExtractedData(null);
                          setSelectedFile(null);
                          setRawText("");
                          setDebugInfo(null);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Scan Another
                      </button>
                      <button
                        onClick={handleAddTransaction}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Add Transaction
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
