// Libs
import useSWR from "swr";
import api from "utils/swr";
import { useCallback, useState } from "react";
import { message } from "antd";

//TODO: Match with backend endpoint
const pathName = "/work-experience"; // End point
const msgHead = "Work experience"; // Just For message

//? ============== GENERAL HOOK (ALL DATA) ============= ?//

export const useExperiences = ({ queryString = "" }) => {
  const pathKeys = pathName + "?" + queryString;
  const [loading, setLoading] = useState(false);

  const { data = [], error, isValidating, mutate } = useSWR(pathKeys);
  const results = data?.data;
  const total = data?.total;

  // Add Hook Function
  const onAdd = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const { data: res } = await api.post(pathName, data);
        if (res.success) {
          mutate();
          message.success(`Success adding a new ${msgHead}`);
          return res.success;
        } else {
          message.error(`Something went wrong while adding a new ${msgHead}`);
          return res.success;
        }
      } catch (error) {
        message.error(`Something went wrong while on system`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [mutate]
  );
  // ==========================

  // Delete Hook Function
  const onDelete = useCallback(
    async (singleId) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete(pathName + `/${singleId}`, data);
        if (res.success) {
          mutate();
          message.success(`Success delete a new ${msgHead}`);
          return res.success;
        } else {
          message.error(`Something went wrong while adding a new ${msgHead}`);

          return res.success;
        }
      } catch (error) {
        message.error(`Something went wrong while on system`);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [data, mutate]
  );
  // ==========================

  return {
    data: results,
    total,
    loading: (!error && !data) || isValidating || loading,
    onAdd,
    onDelete,
  };
};

// * ====================================== * //

//? ============== SPECIFIC HOOK (SINGLE DATA) ============= ?//

export const useExperience = ({ singleId }) => {
  const pathKeys = `${pathName}/${singleId}`;
  const [loading, setLoading] = useState(false);

  const { data = [], error, isValidating, mutate } = useSWR(pathKeys);
  const results = data?.data;
  const total = data?.data;

  // Edit Hook Function
  const onEdit = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const { data: res } = await api.put(pathKeys, data);
        if (res.success) {
          mutate();
          message.success(`Success edit a new ${msgHead}`);

          return res.success;
        } else {
          message.error(`Something went wrong while edit a new ${msgHead}`);

          return res.success;
        }
      } catch (error) {
        message.error(`Something went wrong while on system`);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [mutate, pathKeys]
  );
  // ==========================

  return {
    data: results,
    total,
    loading: (!error && !data) || isValidating || loading,
    onEdit,
  };
};

// * ====================================== * //
