import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Contact } from '../models/contact.model'

export const contactsApi = createApi({
  reducerPath: 'contactsApi', // reducerPath to attach it with the store
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3006' }),
  // adding cache tags to automate fetching of data based on entity (Contact)
  // For more info - https://redux-toolkit.js.org/rtk-query/usage/automated-refetching
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    // get all the contacts
    // .query for GET request
    // .mutation for post, put, patch, delete
    contacts: builder.query<Contact[], void>({
      query: () => '/contacts',
      // providedTags needed for .query(GET requests) for auto-fetching
      providesTags: ['Contact'],
    }),
    // get details of contact
    contact: builder.query<Contact, number>({
      query: (id) => `/contacts/${id}`,
      providesTags: ['Contact'],
    }),
    // posting data - using builder.mutation
    addContact: builder.mutation<void, Contact>({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      // invalidateTags needed for .mutation(POST/PUT/DELETE requests) for auto-fetching
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        // if name/id/email (any field) is updated, then passing the rest fields as it is
        url: `/contacts/${id}`,
        method: 'PUT',
        body: { id: id, ...rest },
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<void, number>({
      // function returns void, takes param (id) as number
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
})

export const {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi
