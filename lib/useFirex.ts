import { useContext } from "react";
import { FirexContext } from "./FirexContext";

/**
 * Firex hook
 */

export const useFirex = () => ({ ...useContext(FirexContext) });
