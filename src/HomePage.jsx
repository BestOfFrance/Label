export default function HomePage(props) {
  return(
    <div className="main-body-main-page">
      <div className="main-container">
        <div className="premium-map">
        
        <div className="premium-list">
        {/* <ReportButton/> */}
        <h3>Premium Card</h3>
        <nav>
        <Link to="/loginorsign">HELLO</Link>
      </nav>
          <div className="cms">
          {/* <DataButton onClick={saveShop}/> */}
        <ListGroup as="ul" id="premium">
          {premium[0]}
          {items}
       </ListGroup>
       </div>
          </div>
          
          
        <Maps location={state.location} zoomLevel={17} shops={state.shops} marker={pin} onChange={onChange} onFilter={onFilter} signedIn={state.signedIn} categories={categoriesArray}>
        
        </Maps>
        
        </div>
        
        <div className="list-bottom">
         
        <h3 className="cms-title">French Food Near You</h3>
        <FilterCms
        onFilterCms={onFilterCMS}
        categories={categoriesArray}/>
        
        {state.sortedShops !== undefined &&
        <div  className="cms-cards">
          
          <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {cmsBakery[0]}
        </Grid>
        <Grid item xs="auto">
          {cmsBakery[1]}
        </Grid>
        <Grid item xs="auto">
        {cmsBakery[2]}
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {cmsBakery[3]}
        </Grid>
        <Grid item xs="auto">
          {cmsBakery[4]}
        </Grid>
        <Grid item xs="auto">
        {cmsBakery[5]}
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {cmsBakery[6]}
        </Grid>
        <Grid item xs="auto">
          {cmsBakery[7]}
        </Grid>
        <Grid item xs="auto">
        {cmsBakery[8]}
        </Grid>
      </Grid>
    </Box>

         
          </div>
          }
          
        </div>
      </div>
      </div>

         
          
  )
}