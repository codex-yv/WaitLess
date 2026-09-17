export const authEndpoints = {
    login: 'api/auth/login',
    signup: 'api/auth/signup',
    coordinatorSignup: 'api/auth/login/coordinator',
    googleLogin: 'api/auth/google/login',
    googleVerify: 'api/auth/google/verify'
}

export const homePage = {
    home: 'api/home/',

}

export const dasboardAdmin = {
    adminDashboard: 'api/admin/dashboard/',
    adminDashboardActivity: 'api/admin/dashboard/activity',
    addCoordinator: 'api/admin/dashboard/add-coordinator',
    removeCoordinator: 'api/admin/dashboard/delete-coordinator',
    getCoordinators: 'api/admin/dashboard/show-coordinators'

}

export const adminForm = {
    getForms: 'api/admin/form/',
    createForm: 'api/admin/form/create-form',
    deleteForm: 'api/admin/form/delete-form'
}

export const adminTrackingEndpoints = {
    liveTracking: 'api/admin/tracking/live',
    nextCustomer: 'api/admin/tracking/next',
    skipCustomer: 'api/admin/tracking/skip',
    cancelCustomer: 'api/admin/tracking/cancel'
}

export const clientForm = {
    scanQR: 'api/forms/new',
    reScanQR: 'api/forms/exist',
    submitForm: 'api/forms/submit'
}

export const clientDashboard = {
    dashboard: 'api/client/dashboard/',
    cancel: 'api/client/dashboard/cancel',
    doneMissed: 'api/client/dashboard/done-missed'
}
