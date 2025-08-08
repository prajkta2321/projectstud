package com.example.studentCRUD.repository;

import com.example.studentCRUD.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

	<S> Student save(Iterable<S> student);
}
