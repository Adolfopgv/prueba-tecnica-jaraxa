import React, { useState, useEffect } from "react";
import { getLabeling } from "../services/openFDA";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Button,
  TablePagination,
  Grid2,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();

  const fetchData = async (searchQuery, currentPage, rowsPerPage) => {
    setLoading(true);
    setError("");
    try {
      const data = await getLabeling(
        searchQuery,
        rowsPerPage,
        currentPage * rowsPerPage
      );
      setResults(data || []);
      setTotalResults(1000);
    } catch (err) {
      setError("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("", page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    setPage(0);
    fetchData(query, 0, rowsPerPage);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      {/* Barra lateral / superior en pantallas pequeñas */}
      <Box
        sx={{
          width: { xs: "100%", md: "25%" },
          p: 3,
          borderRight: { xs: "none", md: "1px solid #ccc" },
          borderBottom: { xs: "1px solid #ccc", md: "none" },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Filtros de búsqueda
        </Typography>
        <TextField
          label="Buscar medicamentos"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          InputProps={{
            endAdornment: (
              <SearchIcon onClick={handleSearch} sx={{ cursor: "pointer" }} />
            ),
          }}
        />
      </Box>

      {/* Contenedor de resultados */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Resultados
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={40} />
          </Box>
        )}
        {error && (
          <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
            {error}
          </Typography>
        )}
        <Grid2 container spacing={3}>
          {results.map((item, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() =>
                  navigate(`/product/${item.openfda?.product_ndc[0]}`)
                }
                sx={{
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                  bgcolor: "lightgreen",
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {item.openfda?.brand_name || "Sin nombre disponible"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.openfda?.manufacturer_name ||
                      "Fabricante no disponible"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(`/product/${item.openfda?.product_ndc[0]}`)
                    }
                  >
                    Ver detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        {results.length > 0 && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <TablePagination
              component="div"
              count={totalResults}
              page={page}
              onPageChange={(_, newPage) => handlePageChange(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
