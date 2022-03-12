import {
    useNavigate
} from "remix";import {
    // createStyles,
    Navbar,
    Table,
    ThemeIcon
} from '@mantine/core';

import {
    MdOutlineAccountBalanceWallet,
    MdOutlineGroupWork,
    MdOutlineSwapHorizontalCircle
} from "react-icons/md";

// const useStyles = createStyles((theme, _params, getRef) => {
//     const icon = getRef('icon');
//     return {
//         header: {
//             paddingBottom: theme.spacing.md,
//             marginBottom: theme.spacing.md * 1.5,
//             borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
//                 }`,
//         },

//         footer: {
//             paddingTop: theme.spacing.md,
//             marginTop: theme.spacing.md,
//             borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
//                 }`,
//         },

//         link: {
//             ...theme.fn.focusStyles(),
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             fontSize: theme.fontSizes.sm,
//             color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
//             padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
//             borderRadius: theme.radius.sm,
//             fontWeight: 500,

//             '&:hover': {
//                 backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//                 color: theme.colorScheme === 'dark' ? theme.white : theme.black,

//                 [`& .${icon}`]: {
//                     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//                 },
//             },
//         },

//         linkIcon: {
//             ref: icon,
//             color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
//             marginRight: theme.spacing.sm,
//         },

//         linkActive: {
//             '&, &:hover': {
//                 backgroundColor:
//                     theme.colorScheme === 'dark'
//                         ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
//                         : theme.colors[theme.primaryColor][0],
//                 color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
//                 [`& .${icon}`]: {
//                     color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
//                 },
//             },
//         },
//     };
// });

// const data = [
//     { link: "/dashboard/balances", label: "Account Balances", icon: MdOutlineAccountBalanceWallet },
//     { link: "/dashboard/pool", label: "Liquidity Pool", icon: MdOutlineGroupWork },
//     { link: "/dashboard/swap", label: "Multi-Asset Swap", icon: MdOutlineSwapHorizontalCircle },
// ];

const DashboardNavBar = () => {
    const navigate = useNavigate();
    // const { classes, cx } = useStyles();

    // const links = data.map((item) => (
    //     <a
    //         className={cx(classes.link, { [classes.linkActive]: item.label === active })}
    //         href={item.link}
    //         key={item.label}
    //         onClick={(event) => {
    //             event.preventDefault();
    //             setActive(item.label);
    //             navigate(item.link);
    //         }}
    //     >
    //         <item.icon className={classes.linkIcon} />
    //         <span>{item.label}</span>
    //     </a>
    // ));

    return (
        <Navbar width={{ base: 300 }} height={500}>
            {/* <Navbar.Section grow>
                    {links}
                </Navbar.Section> */}
            <Navbar.Section>
                <Table style={{ width: "100%" }} highlightOnHover>
                    <tbody>
                        <tr onClick={() => navigate("/dashboard/balances")}>
                            <td width="28px">
                                <ThemeIcon>
                                    <MdOutlineAccountBalanceWallet />
                                </ThemeIcon>
                            </td>
                            <td>
                                Account Balances
                            </td>
                        </tr>
                        <tr onClick={() => navigate("/dashboard/pool")}>
                            <td>
                                <ThemeIcon>
                                    <MdOutlineGroupWork />
                                </ThemeIcon>
                            </td>
                            <td>
                                Liquidity Pool
                            </td>
                        </tr>
                        {/* <tr onClick={() => setOpened(true)}> */}
                        <tr onClick={() => navigate("/dashboard/swap")}>
                            <td>
                                <ThemeIcon>
                                    <MdOutlineSwapHorizontalCircle />
                                </ThemeIcon>
                            </td>
                            <td>
                                Multi-Asset Swap
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Navbar.Section>
        </Navbar>
    )

};

export default DashboardNavBar;