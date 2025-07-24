export default function NotFoundPage() {
    // The NotFoundPage component is displayed when the user navigates to a route that does not match any defined routes
    // It provides a simple message indicating that the requested page could not be found
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}
