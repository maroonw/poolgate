import { useGetPoolsQuery } from "./poolsApiSlice"
import Pool from "./Pool"

const PoolsList = () => {
    const {
        data: pools,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPoolsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = pools

        const tableContent = ids?.length
            ? ids.map(poolId => <Pool key={poolId} poolId={poolId} />)
            : null

        content = (
            <table className="table table--pools">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th pool__username">Owner</th>
                        <th scope="col" className="table__th pool__created">Created</th>
                        <th scope="col" className="table__th pool__updated">Updated</th>
                        <th scope="col" className="table__th pool__title">Description</th>
                        <th scope="col" className="table__th pool__address">Address</th>
                        <th scope="col" className="table__th pool__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default PoolsList