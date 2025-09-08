// Tuto for this example -- https://www.baeldung.com/intro-to-project-lombok

package org.example.lombok;

import lombok.*;
import lombok.experimental.Accessors;

@Accessors(fluent = true) @Getter @Setter //Build a fluent like getters and setters
@RequiredArgsConstructor // A constructor with all final fields
@NoArgsConstructor(force = true)
@ToString
@EqualsAndHashCode // THis sis useful when dealing with collections, e.g. Set, or when creating Value Objects where same attribute values => equality
public class LoginResult {
    @NonNull
    private String userName;
    @NonNull
    private String password;
}
