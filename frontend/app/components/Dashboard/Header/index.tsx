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
    chain: string,
    poolToken: PoolToken
    assetTokens: Dict<AssetToken>
};

const DashboardHeader = (props: HeaderProps) => {
    const { chain, poolToken, assetTokens } = props;
    const {
        isAuthenticated,
        authenticate,
        logout,
        account,
        Moralis
    } = useMoralis();

    const handleLogin = async () => { await authenticate(); };

    const handleLogout = async () => { await logout(); };

    const handleMintTokens = async () => {
        Object.values(assetTokens).forEach(async (asset: AssetToken) => {
            const value = poolToken.contractBalance/10;
            const price = asset.weight*poolToken.contractBalance/asset.contractBalance;
            const amount = value/price;
            await Moralis.executeFunction({
                contractAddress: asset.address,
                functionName: "mint",
                abi: tokenAbi,
                params: {
                    amount: BigNumber.from((amount*10**asset.decimals).toLocaleString('fullwide',{useGrouping:false})),
                }
            });
        });
    };

    const handleBurnTokens = async () => {
        if (account) {
            await Moralis.Web3API.account.getTokenBalances({
                account,
                chain
            }).then((balanceData: any) => {
                balanceData.forEach(async (b: any) => {
                    if (assetTokens[b.token_address]?.contractBalance > 0) {
                        await Moralis.executeFunction({
                            contractAddress: b.token_address,
                            functionName: "burn",
                            abi: tokenAbi,
                            params: {
                                amount: b.balance,
                            }
                        });
                    };
                });
            });
        };
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
                        onClick={handleMintTokens}
                        ml="md"
                        size="md"
                    >
                        Mint Test Tokens
                    </Button>
                    <Button
                        onClick={handleBurnTokens}
                        ml="md"
                        size="md"
                    >
                        Burn Test Tokens
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
