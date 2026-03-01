// Edit this list as you create more items.
// image paths should live in /assets, e.g. /assets/wallet1.jpg
window.PRODUCTS = [
  // Minimal Card Wallet
  {
    id: "wal-001",
    name: "Minimal Card Wallet",
    category: "Wallets",
    leather: "Full grain leather",
    finish: "Hand-stitched, burnished edges",
    leadTime: "1–2 weeks",
    priceHint: "From $55",
    featured: true,
    tags: ["Front pocket friendly"],
    images: [
      "/assets/cardholders/slim-card-wallet-blue1.png",
      "/assets/cardholders/slim-card-wallet-blue2.png"
    ],
    bullets: [
      "Slim profile (front pocket friendly)",
      "Holds 4–8 cards + folded cash",
      "Custom leather + thread options",
      "Many different color options available"
    ],
    materials: [
      "Full grain leather",
      "Hand-stitched",
      "Burnished or painted edges"
    ],
    care: [
      "To clean: with a damp cloth, wipe away dirt and debris. For tougher stains, use a leather cleaner or saddle soap.",
      "If wet: dry with a dry cloth.",
      "Condition lightly 1–2x/year if needed."
    ],
    dimensions: [
      "Approx: 4\" W x 3\" H",
      "Holds 4–8 cards + folded cash"
    ],
    guarantee: [
      "Built to last. If stitching fails under normal use, send it back for repair/replacement."
    ],
    shipping: [
      "All items are made to order, shipping times may vary.",
      "Turnaround depends on current queue (see lead time).",
      "Returns accepted on non-custom items within 14 days (unused)."
    ],
    description:
      "A clean, everyday carry wallet built from full grain leather with tight stitch lines and rounded, burnished edges. Wallet shown was made with a beautiful blue saffiano leather from Europe."
  },

  // Bifold Wallet
  {
    id: "wal-002",
    name: "Bifold Wallets",
    category: "Wallets",
    leather: "Full grain leather",
    finish: "Hand-stitched, edge painted or burnished",
    leadTime: "1–2 weeks",
    priceHint: "From $110",
    featured: true,
    tags: ["Hand Crafted"],
    images: [
      "/assets/bifolds/bifold-display.png"
    ],
    bullets: [
      "Cut to your exact size",
      "Hardware color options",
      "Built to patina over time"
    ],
    description:
      "A sturdy, timeless belt made to fit. Choose leather color, buckle style, and stitch details."
  },

  // Belts
  {
    id: "blt-001",
    name: "Classic Belt",
    category: "Belts",
    leather: "Full grain strap leather",
    finish: "Custom length, edge painted or burnished",
    leadTime: "1–2 weeks",
    priceHint: "From $70",
    featured: true,
    tags: ["Custom sizing"],
    images: [
      {
        src: "/assets/belts/belt-chrome-blue.png",
        notes: [
          "Shown in a single layer of rich Ink Blue Horween Cavalier chrome-tanned leather with Nickle plated solid brass rivets and buckle.",
          "This belt was cut to 34\" length by 1.5\" wide strap",
          "8/10oz / 3.2 - 4.0mm thick leather",
          "Many different leather and hardware options available.",
        ]
      },
      {
        src: "/assets/belts/belt-veg-natural1.png",
        notes: [
          "Shown in a single layer of Wickett & Craig natural veg-tanned leather with solid brass rivets and buckle.",
          "This belt was cut to 34\" length by 1.5\" wide strap, and features burnished edges.",
          "10/12oz / 4.0 - 4.8mm thick leather",
          "Many leather and hardware options available."
        ]
      }
    ],
    bullets: [
      "Cut to your exact size",
      "Rivet options: Antique solid brass, Nickle plated solid Brass, Natural Brass, Matte Black, Copper plated solid brass",
      "Buckle options: Antique solid brass, Nickle plated solid Brass, Natural Brass",
      "Built to patina over time",
      "Note: Leather belts are a natural product and will stretch over time, expect about 0.5–1\" of stretch depending on leather choice and belt usage."
    ],
    description:
      "Made in the USA, a timeless belt made to last. Choose leather color, buckle style, Fastener color, and or stitch details.",

    materials: [
      "Full grain leather",
      "Hand-stitched",
      "Burnished edges"
    ],
    care: [
      "To clean: with a damp cloth, wipe away dirt and debris. For tougher stains, use a leather cleaner or saddle soap.",
      "If wet: dry with a dry cloth.",
      "Condition lightly 1–2x/year if needed."
    ],
    dimensions: [
      "Approx: 37\" L x 1.5\" W"
    ],
    guarantee: [
      "Built to look great and last.  send it back for repair/replacement."
    ],
    shipping: [
      "All items are made to order, shipping times may vary.",
      "Turnaround depends on current queue (see lead time).",
      "Returns accepted on non-custom items within 14 days (unused)."
    ],
  },

  // Crossbody Purse
  {
    id: "bag-001",
    name: "Crossbody Purse",
    category: "Purses",
    leather: "Full grain leather",
    finish: "Lined interior, adjustable strap",
    leadTime: "2–4 weeks",
    priceHint: "From $200",
    featured: true,
    tags: ["Bespoke"],
    images: [
      "/assets/bags/crossbody.png",
      "/assets/placeholder-purse-2.jpg"
    ],
    bullets: [
      "Adjustable strap",
      "Interior pocket options",
      "Hardware finishes available"
    ],
    description:
      "A mid-sized, functional purse with clean lines. Customize strap length, hardware, and interior pockets."
  },

  // Accessory Item * Key Fob
  {
    id: "acc-001",
    name: "Key Fob",
    category: "Accessories",
    leather: "Full grain leather",
    finish: "Reinforced rivet, hand-finished",
    leadTime: "3–7 days",
    priceHint: "From $25",
    featured: false,
    tags: ["Gift"],
    images: [
      "/assets/placeholder-keyfob.jpg"
    ],
    bullets: [
      "Quick turnaround",
      "Custom Designs",
      "Great gift add-on"
    ],
    description:
      "A small daily carry piece that breaks in beautifully. Add initials for a personal touch."
  }

];

window.CATEGORIES = ["All", "Wallets", "Belts", "Purses", "Accessories"];