import { useMoralis } from "react-moralis";
import {
    Button,
    Header
} from '@mantine/core';
import { BigNumber } from "ethers";

import type { PoolToken, AssetToken } from "~/moralis.server";
import { tokenAbi } from "~/utils";
import type { Dict } from "~/utils";

type HeaderProps = {
    poolToken: PoolToken
    assetTokens: Dict<AssetToken>
};

const DashboardHeader = (props: HeaderProps) => {
    const { assetTokens } = props;
    const {
        isAuthenticated,
        authenticate,
        logout,
        Moralis
    } = useMoralis();

    const handleLogin = async () => { await authenticate(); };

    const handleLogout = async () => { await logout(); };

    const handleSendTokens = async () => {
        Object.values(assetTokens).forEach(async (asset: AssetToken) => {
            const n = parseInt(asset.symbol.slice(1));
            await Moralis.executeFunction({
                contractAddress: asset.address,
                functionName: "mint",
                abi: tokenAbi,
                params: {
                    amount: BigNumber.from((n*10**(5+asset.decimals)).toLocaleString('fullwide',{useGrouping:false})),
                }
            });
        });
    };

    return (
        <Header height={60} p="xs">
            {isAuthenticated ?
                <>
                    <Button
                        onClick={handleLogout}
                        ml="md"
                        size="md"
                    >
                        Logout
                    </Button>
                    <Button
                        onClick={handleSendTokens}
                        ml="md"
                        size="md"
                    >
                        Send Tokens
                    </Button>
                </> :
                <Button
                    onClick={handleLogin}
                    ml="md"
                    size="md"
                >
                    Connect Wallet
                </Button>
            }
        </Header>
    )
};

export default DashboardHeader;
