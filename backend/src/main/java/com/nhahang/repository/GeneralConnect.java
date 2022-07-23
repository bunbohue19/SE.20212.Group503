package com.nhahang.repository;

import java.sql.*; 
import java.util.ArrayList;
import java.util.List;
import com.nhahang.repository.mapping.GeneralMap;


public class GeneralConnect<T>{
	public static Connection getConnection()
	{
		try {
			String userName = "group3";
			String password = "p@ssword1";
			String url = "jdbc:sqlserver://group3-database-server.database.windows.net:1433;databaseName=restaurant_group03";
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			return DriverManager.getConnection(url, userName, password);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.getMessage();
			return null;
		}		

	}
	
	public static Connection getConnection1()
	{
		try {
			String userName = "mylogin";
			String password = "123";
			String url = "jdbc:sqlserver://localhost:1433;databaseName=Restaurant"; 
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			return DriverManager.getConnection(url, userName, password);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.getMessage();
			return null;
		}		

	}
	
	public static <T> List<T> select(String sql, GeneralMap<T> m, Object...parameters)
	{
		List<T> results = new ArrayList<>();
		Connection c= getConnection1();
		PreparedStatement p=null;
		ResultSet s=null;
		try {
			p= c.prepareStatement(sql);
			setParameter(p, parameters);
			s=p.executeQuery();	
			while(s.next())
			{
				results.add(m.map(s));
			}
			
			return results;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
	
		}finally {
			try {
				if (c != null) {
					c.close();
				}
				if (p != null) {
					p.close();
				}
				if (s != null) {
					s.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
	}
	
	
	private static void setParameter(PreparedStatement statement, Object... parameters) {
		try {
			for (int i = 0; i < parameters.length; i++) {
				Object parameter = parameters[i];
				
				int index = i + 1;
				if(parameter == null)
				{
					statement.setNull(index, Types.NULL);
				}
				else
				{	
					if (parameter instanceof Long) {
						statement.setLong(index, (Long) parameter);
					} else if (parameter instanceof String) {
						statement.setString(index, (String) parameter);
					} else if (parameter instanceof Integer) {
						statement.setInt(index, (Integer) parameter);
					} else if (parameter instanceof Timestamp) {
						statement.setTimestamp(index, (Timestamp) parameter);
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void update(String sql, Object... parameters) {
		Connection connection = null;
		PreparedStatement statement = null;
		try {
			connection = getConnection1();
			connection.setAutoCommit(false);
			statement = connection.prepareStatement(sql);
			setParameter(statement, parameters);
			statement.executeUpdate();
			
			connection.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			if (connection != null) {
				try {
					connection.rollback();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		} finally {
			try {
				if (connection != null) {
					connection.close();
				}
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
	}
	
	
	public static Integer insert(String sql, Object... parameters) {
		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		try {
			Integer id = null;
			connection = getConnection1();
			connection.setAutoCommit(false);
			statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			setParameter(statement, parameters);
			statement.executeUpdate();
			resultSet = statement.getGeneratedKeys();
			if (resultSet.next()) {
				id = resultSet.getInt(1);
				
			}
			connection.commit();
			return id;
		} catch (SQLException e) {
			e.printStackTrace();
			if (connection != null) {
				try {
					System.out.println("f");
					connection.rollback();
				} catch (SQLException e1) {
					e1.printStackTrace();
					
				}
			}
		} finally {
			try {
				if (connection != null) {
					connection.close();
				}
				if (statement != null) {
					statement.close();
				}
				if (resultSet != null) {
					resultSet.close();
				}
			} catch (SQLException e2) {
				e2.printStackTrace();
				
			}
		}
		return null;
	}

	public static int count(String sql, Object... parameters) {
		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		try {
			int count = 0;
			connection = getConnection();
			statement = connection.prepareStatement(sql);
			setParameter(statement, parameters);
			resultSet = statement.executeQuery();
			while (resultSet.next()) {
				count = resultSet.getInt(1);
			}
			return count;
		} catch (SQLException e) {
			return 0;
		} finally {
			try {
				if (connection != null) {
					connection.close();
				}
				if (statement != null) {
					statement.close();
				}
				if (resultSet != null) {
					resultSet.close();
				}
			} catch (SQLException e) {
				return 0;
			}
		}
	}
}
