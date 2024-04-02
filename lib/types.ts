export type TGenericSizes =
    | "2xl"
    | "2xs"
    | "3xl"
    | "3xs"
    | "4xl"
    | "5xl"
    | "6xl"
    | "lg"
    | "md"
    | "sm"
    | "xl"
    | "xs";

export type TDefaultColor = "coral" | "black" | "white";
// Extracting regular sizes from TGenericSizes
export type TRegularSizes = Extract<TGenericSizes, "sm" | "md" | "lg">;

export type TRegularSizesWithExtraLarge = Extract<
    TGenericSizes,
    "sm" | "md" | "lg" | "xl"
>;
export type TSemiRegularSizes = Exclude<TRegularSizesWithExtraLarge, "sm">;

// Extracting large sizes from TGenericSizes
export type TLargeSizes = Extract<
    TGenericSizes,
    "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
>;

// Extracting small sizes from TGenericSizes
export type TSmallSizes = Extract<TGenericSizes, "2xs" | "3xs" | "xs">;

// Extracting medium sizes from TGenericSizes
export type TMediumSizes = Extract<TGenericSizes, "sm" | "md">;

// Combining large and medium sizes
export type TLargeAndMediumSizes = TLargeSizes | TMediumSizes;

// Combining large, medium, and small sizes
export type TLargeMediumSmallSizes = TLargeSizes | TMediumSizes | TSmallSizes;

// Combining all sizes except extra-small
export type TAllSizesExceptExtraSmall = Exclude<TGenericSizes, TSmallSizes>;

// Combining all sizes except large
export type TAllSizesExceptLarge = Exclude<TGenericSizes, TLargeSizes>;

// Combining all sizes except medium
export type TAllSizesExceptMedium = Exclude<TGenericSizes, TMediumSizes>;

// Combining all sizes except regular sizes
export type TAllSizesExceptRegular = Exclude<TGenericSizes, TRegularSizes>;

// Combining all sizes except large and small
export type TAllSizesExceptLargeSmall = Exclude<
    TGenericSizes,
    TLargeSizes | TSmallSizes
>;

// Combining all sizes except medium and extra-small
export type TAllSizesExceptMediumExtraSmall = Exclude<
    TGenericSizes,
    TMediumSizes | TSmallSizes
>;
