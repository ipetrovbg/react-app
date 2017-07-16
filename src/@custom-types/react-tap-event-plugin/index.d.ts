interface StrategyOverrides {
    shouldRejectClick?: (lastTouchEventTimestamp: Date, clickEventTimestamp: Date) => boolean;
}

declare var injectTapEventPlugin: (strategyOverrides?: StrategyOverrides) => void;

export default injectTapEventPlugin;