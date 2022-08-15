import mongoose from 'mongoose';
export declare const User: mongoose.Model<{
    developmentgoals: mongoose.Types.DocumentArray<{
        type?: string | undefined;
        fields?: {
            development?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            support?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            activity?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    }>;
    performancegoals: mongoose.Types.DocumentArray<{
        type?: string | undefined;
        fields?: {
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            performance?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            measures?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    }>;
    fullname?: string | undefined;
    password?: string | undefined;
    role?: string | undefined;
    manager?: string | undefined;
    managerId?: string | undefined;
    email?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    developmentgoals: mongoose.Types.DocumentArray<{
        type?: string | undefined;
        fields?: {
            development?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            support?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            activity?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    }>;
    performancegoals: mongoose.Types.DocumentArray<{
        type?: string | undefined;
        fields?: {
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            performance?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            measures?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    }>;
    fullname?: string | undefined;
    password?: string | undefined;
    role?: string | undefined;
    manager?: string | undefined;
    managerId?: string | undefined;
    email?: string | undefined;
}>>;
export declare const Review: mongoose.Model<{
    managerId?: string | undefined;
    score?: number | undefined;
    rating?: number | undefined;
    employee?: string | undefined;
    appraise?: string | undefined;
    employeeId?: string | undefined;
    objectiveType?: string | undefined;
    developmentObjective?: {
        type?: string | undefined;
        fields?: {
            development?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            support?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            activity?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    performanceObjective?: {
        type?: string | undefined;
        fields?: {
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            performance?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            measures?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    managerId?: string | undefined;
    score?: number | undefined;
    rating?: number | undefined;
    employee?: string | undefined;
    appraise?: string | undefined;
    employeeId?: string | undefined;
    objectiveType?: string | undefined;
    developmentObjective?: {
        type?: string | undefined;
        fields?: {
            development?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            support?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            activity?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    performanceObjective?: {
        type?: string | undefined;
        fields?: {
            comments?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            performance?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
            measures?: {
                data: string[];
                status?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
}>>;
export declare const Manager: mongoose.Model<{
    employees: mongoose.Types.DocumentArray<{
        developmentgoals: mongoose.Types.DocumentArray<{
            type?: string | undefined;
            fields?: {
                development?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                support?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                activity?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        }>;
        performancegoals: mongoose.Types.DocumentArray<{
            type?: string | undefined;
            fields?: {
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                performance?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                measures?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        }>;
        fullname?: string | undefined;
        password?: string | undefined;
        role?: string | undefined;
        manager?: string | undefined;
        managerId?: string | undefined;
        email?: string | undefined;
    }>;
    history: mongoose.Types.DocumentArray<{
        managerId?: string | undefined;
        score?: number | undefined;
        rating?: number | undefined;
        employee?: string | undefined;
        appraise?: string | undefined;
        employeeId?: string | undefined;
        objectiveType?: string | undefined;
        developmentObjective?: {
            type?: string | undefined;
            fields?: {
                development?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                support?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                activity?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        performanceObjective?: {
            type?: string | undefined;
            fields?: {
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                performance?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                measures?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    }>;
    fullname?: string | undefined;
    password?: string | undefined;
    role?: string | undefined;
    email?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    employees: mongoose.Types.DocumentArray<{
        developmentgoals: mongoose.Types.DocumentArray<{
            type?: string | undefined;
            fields?: {
                development?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                support?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                activity?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        }>;
        performancegoals: mongoose.Types.DocumentArray<{
            type?: string | undefined;
            fields?: {
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                performance?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                measures?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        }>;
        fullname?: string | undefined;
        password?: string | undefined;
        role?: string | undefined;
        manager?: string | undefined;
        managerId?: string | undefined;
        email?: string | undefined;
    }>;
    history: mongoose.Types.DocumentArray<{
        managerId?: string | undefined;
        score?: number | undefined;
        rating?: number | undefined;
        employee?: string | undefined;
        appraise?: string | undefined;
        employeeId?: string | undefined;
        objectiveType?: string | undefined;
        developmentObjective?: {
            type?: string | undefined;
            fields?: {
                development?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                support?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                activity?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        performanceObjective?: {
            type?: string | undefined;
            fields?: {
                comments?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                performance?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
                measures?: {
                    data: string[];
                    status?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    }>;
    fullname?: string | undefined;
    password?: string | undefined;
    role?: string | undefined;
    email?: string | undefined;
}>>;
