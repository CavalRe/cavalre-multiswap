import { forwardRef } from "react";
import {
    Text,
} from "@mantine/core";

import type { Token } from "~/moralis.server";

type TokenItemProps = {
    label: string,
    value: string,
    token: Token
};

const TokenItem = forwardRef<HTMLDivElement, TokenItemProps>(
    ({ label, value, token, ...others }: TokenItemProps, ref) => {
        return (
            <div ref={ref} style={{ width: "100%" }} {...others}>
                <span>
                    <Text size="md" color="bold" component="span">
                        {`${token.name}`}
                    </Text>
                    <Text size="xs" color="dimmed" component="span">
                        {` (${token.symbol})`}
                    </Text>
                </span>
            </div>
        );
    }
);

export default TokenItem;
