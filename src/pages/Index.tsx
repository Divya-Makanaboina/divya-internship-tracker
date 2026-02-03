const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <span className="text-4xl">🚀</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Coming Soon
        </h1>
        <p className="text-lg text-muted-foreground">
          We're working on something exciting. Stay tuned!
        </p>
        <div className="pt-4">
          <div className="h-1 w-24 mx-auto bg-primary/30 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
