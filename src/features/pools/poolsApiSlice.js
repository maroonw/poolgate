import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const poolsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = poolsAdapter.getInitialState()

export const poolsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPools: builder.query({
            query: () => '/pools',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, // may change to 60 for deployment
            transformResponse: responseData => {
                const loadedPools = responseData.map(pool => {
                    pool.id = pool._id
                    return pool
                });
                return poolsAdapter.setAll(initialState, loadedPools)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Pool', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Pool', id }))
                    ]
                } else return [{ type: 'Pool', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetPoolsQuery,
} = poolsApiSlice

// returns the query result object
export const selectPoolsResult = poolsApiSlice.endpoints.getPools.select()

// creates memoized selector
const selectPoolsData = createSelector(
    selectPoolsResult,
    poolsResult => poolsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPools,
    selectById: selectPoolById,
    selectIds: selectPoolIds
    // Pass in a selector that returns the pools slice of state
} = poolsAdapter.getSelectors(state => selectPoolsData(state) ?? initialState)